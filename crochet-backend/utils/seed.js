import "../config/env.js";                 // ← load .env FIRST, before mongoose
import mongoose from "mongoose";
import Product from "../models/Product.js";

const products = [
  {
    name: "Marlow Market Tote",
    slug: "marlow-market-tote",
    description:
      "A sturdy, hand-crocheted tote with leather handles. Roomy enough for market hauls, soft enough for everyday.",
    price: 68,
    category: "Bags",
    images: [
      "https://images.unsplash.com/photo-1686285961015-12886f9b3bf5?auto=format&fit=crop&w=900&q=85",
    ],
    tags: ["Bestseller"],
    colors: ["Rose"],
    stock: 12,
    status: "active",
    featured: true,
  },
  {
    name: "Forget-Me-Not Bouquet",
    slug: "forget-me-not-bouquet",
    description:
      "A forever bouquet of hand-crocheted forget-me-nots. No watering required — just a little dusting now and then.",
    price: 42,
    category: "Flowers",
    images: [
      "https://images.unsplash.com/photo-1700171518313-5dd219beaaa6?auto=format&fit=crop&w=900&q=85",
    ],
    tags: ["New"],
    colors: ["Blue"],
    stock: 20,
    status: "active",
    featured: true,
  },
  {
    name: "Sunday Cloud Cardigan",
    slug: "sunday-cloud-cardigan",
    description:
      "An oversized, featherweight cardigan in a soft cotton blend. Made to order in your size — allow 2–3 weeks.",
    price: 128,
    category: "Wearables",
    images: [
      "https://images.unsplash.com/photo-1556095667-9760aa7f4885?auto=format&fit=crop&w=900&q=85",
    ],
    tags: ["Made to order"],
    colors: ["Oat"],
    stock: 5,
    status: "active",
    featured: true,
  },
  {
    name: "Little Meadow Bunny",
    slug: "little-meadow-bunny",
    description:
      "A sweet amigurumi bunny, ready to be someone's new best friend. Suitable for ages 3+.",
    price: 38,
    category: "Gifts",
    images: [
      "https://images.unsplash.com/photo-1753370241607-5d48d8aaa70e?auto=format&fit=crop&w=900&q=85",
    ],
    tags: ["Only 3 left"],
    colors: ["Cream"],
    stock: 3,
    status: "active",
    featured: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    const created = await Product.insertMany(products);
    console.log(`✅ Seeded ${created.length} products:`);
    created.forEach((p) => console.log(`   - ${p.name} ($${p.price})`));

    await mongoose.connection.close();
    console.log("✅ Done. Connection closed.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();