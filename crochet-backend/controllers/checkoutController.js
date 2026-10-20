import { stripe } from "../services/stripe.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"; 

// POST /api/checkout/session
export async function createCheckoutSession(req, res, next) {
  try {
    const { items, email } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400);
      throw new Error("Cart is empty");
    }

    // 1) Extract the user ID from the token if they are logged in
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
        userId = decoded.id;
      } catch (err) {
        // Token invalid, continue as guest
      }
    }

    // 2) Filter out any items that don't have a valid MongoDB ObjectId
    const validItems = items.filter((i) => mongoose.Types.ObjectId.isValid(i.id));

    if (validItems.length === 0) {
      res.status(400);
      throw new Error("No valid products in cart. Please clear your cart and try again.");
    }

    // 3) Fetch products from DB
    const ids = validItems.map((i) => i.id);
    const dbProducts = await Product.find({ _id: { $in: ids }, status: "active" });

    if (dbProducts.length !== validItems.length) {
      res.status(400);
      throw new Error("One or more products are unavailable");
    }

    // 4) Build line items + internal order items
    const lineItems = [];
    const orderItems = [];
    let subtotal = 0;

    for (const item of validItems) {
      const product = dbProducts.find((p) => p._id.toString() === item.id);
      if (!product) continue;

      const qty = Math.max(1, Math.min(Number(item.quantity) || 1, 99));

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description?.slice(0, 200),
            images: product.images?.slice(0, 1) || [],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: qty,
      });

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: qty,
        image: product.images?.[0] || "",
      });

      subtotal += product.price * qty;
    }

    // 5) Create the Order (Attach the userId)
    const order = await Order.create({
      user: userId, // <-- Added here
      email: email || "pending@checkout.local",
      name: "Pending Checkout",
      items: orderItems,
      subtotal,
      total: subtotal,
      status: "pending",
    });

    // 6) Create Stripe Checkout Session
    const successBase = (process.env.SUCCESS_URL || "").trim() || "https://vermilion-starship-73fed4.netlify.app/checkout/success";
    const cancelBase = (process.env.CANCEL_URL || "").trim() || "https://vermilion-starship-73fed4.netlify.app/checkout/cancel";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${successBase}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelBase,
      metadata: { orderId: order._id.toString() },
      customer_email: email || undefined,
    });

    order.stripeSessionId = session.id;
    await order.save();

    res.json({
      url: session.url,
      orderId: order._id,
      orderNumber: order.orderNumber,
    });
  } catch (err) {
    console.error("❌ Checkout Error:", err.message);
    next(err);
  }
}

//GET /api/checkout/order/:sessionId

export async function getOrderBySession(req, res, next) {
  try {
    const { sessionId } = req.params;
    const order = await Order.findOne({ stripeSessionId: sessionId });

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    res.json({
      orderNumber: order.orderNumber,
      email: order.email,
      items: order.items,
      subtotal: order.subtotal,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
    });
  } catch (err) {
    next(err);
  }
}