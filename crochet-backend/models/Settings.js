import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    // Announcement Bar
    announcementLeft: { type: String, default: "Free US shipping on orders $100+" },
    announcementCenter: { type: String, default: "Spring drop is here — shop the new collection" },
    announcementActive: { type: Boolean, default: true },

    // Hero Section (Optional, but we added it earlier)
    heroImage: { type: String, default: "" },
    heroTitle: { type: String, default: "Made by Hand." },
    heroSubtitle: { type: String, default: "Made with Heart." },
    heroDescription: { type: String, default: "Thoughtful crochet pieces..." },
    
    // Collection Images
    categoryBagsImage: { type: String, default: "" },
    categoryFlowersImage: { type: String, default: "" },
    categoryWearablesImage: { type: String, default: "" },
    categoryGiftsImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);