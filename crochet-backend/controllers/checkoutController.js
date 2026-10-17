import { stripe } from "../services/stripe.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

/**
 * POST /api/checkout/session
 * Body: { items: [{ id, quantity }], email? }
 */
export async function createCheckoutSession(req, res, next) {
  try {
    const { items, email } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400);
      throw new Error("Cart is empty");
    }

    // 1) Fetch all products from DB — NEVER trust prices from client
    const ids = items.map((i) => i.id);
    const dbProducts = await Product.find({ _id: { $in: ids }, status: "active" });

    if (dbProducts.length !== items.length) {
      res.status(400);
      throw new Error("One or more products are unavailable");
    }

    // 2) Build line items + internal order items
    const lineItems = [];
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
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
          unit_amount: Math.round(product.price * 100), // Stripe wants cents
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

    // 3) Create the Order in DB with status "pending"
    const order = await Order.create({
      email: email || "pending@checkout.local",
      name: "Pending Checkout",
      items: orderItems,
      subtotal,
      total: subtotal,
      status: "pending",
    });

    // 4) Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL,
      metadata: { orderId: order._id.toString() },
      customer_email: email || undefined,
    });

    // 5) Save Stripe session ID to the order
    order.stripeSessionId = session.id;
    await order.save();

    res.json({
      url: session.url,
      orderId: order._id,
      orderNumber: order.orderNumber,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/checkout/order/:sessionId
 * Used by the success page to show order details
 */
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