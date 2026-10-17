import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "refunded", "cancelled"],
      default: "pending",
      index: true,
    },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    shippingAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    stripeSessionId: { type: String, unique: true, sparse: true },
    stripePaymentIntent: { type: String, sparse: true },
    notes: { type: String },
  },
  { timestamps: true }
);

// Auto-generate human-friendly order number: LB-2026-0001
// Auto-generate human-friendly order number: LB-2026-0001
orderSchema.pre("save", async function () {
  if (!this.orderNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `LB-${year}-${String(count + 1).padStart(4, "0")}`;
  }
});
export default mongoose.model("Order", orderSchema);