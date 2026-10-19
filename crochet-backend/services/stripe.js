// import Stripe from "stripe";

// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error("STRIPE_SECRET_KEY is not set in .env");
// }

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2024-10-28.acacia", // pin a version for stability
// });


import "../config/env.js";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ CRITICAL ERROR: STRIPE_SECRET_KEY is missing from environment variables!");
} else {
  console.log("✅ STRIPE_SECRET_KEY loaded successfully.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy");