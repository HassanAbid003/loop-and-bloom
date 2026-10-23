import { stripe } from "../services/stripe.js";
import Order from "../models/Order.js";
import { sendOrderConfirmation } from "../services/emailService.js"; // <-- Added import

export async function handleStripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw body (Buffer) — set up in server.js
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const orderId = session.metadata?.orderId;

        if (!orderId) break;

        const order = await Order.findById(orderId);
        if (!order) break;

        // Prevent processing the same event twice (Stripe can send duplicates)
        if (order.status === "paid") {
          return res.json({ received: true, note: "already processed" });
        }

        // Update order with real customer info from Stripe
        order.status = "paid";
        order.email = session.customer_details?.email || order.email;
        order.name = session.customer_details?.name || order.name;
        order.stripePaymentIntent = session.payment_intent;
        order.shippingAddress = session.customer_details?.address || order.shippingAddress;
        await order.save();

        console.log(`✅ Order ${order.orderNumber} marked as PAID`);

        // 📧 Send the confirmation email (fail silently if email fails)
        try {
          await sendOrderConfirmation(order);
        } catch (emailErr) {
          console.error("❌ Failed to send email:", emailErr.message);
        }

        break;
      }

      case "checkout.session.expired":
      case "payment_intent.payment_failed": {
        const session = event.data.object;
        const orderId = session.metadata?.orderId;
        if (orderId) {
          await Order.findByIdAndUpdate(orderId, { status: "cancelled" });
          console.log(`⚠️  Order ${orderId} cancelled/failed`);
        }
        break;
      }

      default:
        // Ignore other events
        break;
    }

    res.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook handler error:", err);
    res.status(500).json({ error: "Webhook handler failed" });
  }
}