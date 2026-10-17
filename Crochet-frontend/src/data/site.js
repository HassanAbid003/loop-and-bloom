export const images = {
  hero: "https://images.unsplash.com/photo-1728393287642-13bee7126ae8?auto=format&fit=crop&w=1600&q=88",
  flowers: "https://images.unsplash.com/photo-1700171518313-5dd219beaaa6?auto=format&fit=crop&w=900&q=85",
  bag: "https://images.unsplash.com/photo-1686285961015-12886f9b3bf5?auto=format&fit=crop&w=900&q=85",
  blueBag: "https://images.unsplash.com/photo-1641934742087-5a5f5da339d6?auto=format&fit=crop&w=900&q=85",
  sweater: "https://images.unsplash.com/photo-1556095667-9760aa7f4885?auto=format&fit=crop&w=900&q=85",
  rabbit: "https://images.unsplash.com/photo-1753370241607-5d48d8aaa70e?auto=format&fit=crop&w=900&q=85",
  textile: "https://images.unsplash.com/photo-1615705592748-029c989e6d5c?auto=format&fit=crop&w=900&q=85",
  yarn: "https://images.unsplash.com/photo-1668072587819-7b393944b426?auto=format&fit=crop&w=1200&q=85",
  maker: "https://images.unsplash.com/photo-1519412849983-957822373d02?auto=format&fit=crop&w=1000&q=85",
};

export const navLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Collections", href: "#collections" },
  { label: "Our Story", href: "#story" },
  { label: "Custom", href: "#custom" },
];

export const brand = {
  name: "Loop & Bloom",
  tagline: "Handmade with Heart",
  email: "hello@loopandbloom.com",
  location: "Portland, Oregon",
  established: 2025,
};

// export const navLinks = [
//   { label: "Shop", href: "/shop" },
//   { label: "Collections", href: "/collections" },
//   { label: "Our Story", href: "/about" },
//   { label: "Custom", href: "/custom" },
// ];

export const products = [
  { id: "marlow-market-tote", name: "Marlow Market Tote", price: 68, image: images.bag, tag: "Bestseller", color: "Rose", category: "Bags", description: "A sturdy, hand-crocheted tote with leather handles. Roomy enough for market hauls, soft enough for everyday." },
  { id: "forget-me-not-bouquet", name: "Forget-Me-Not Bouquet", price: 42, image: images.flowers, tag: "New", color: "Blue", category: "Flowers", description: "A forever bouquet of hand-crocheted forget-me-nots. No watering required." },
  { id: "sunday-cloud-cardigan", name: "Sunday Cloud Cardigan", price: 128, image: images.sweater, tag: "Made to order", color: "Oat", category: "Wearables", description: "An oversized, featherweight cardigan in a soft cotton blend. Made to order in your size." },
  { id: "little-meadow-bunny", name: "Little Meadow Bunny", price: 38, image: images.rabbit, tag: "Only 3 left", color: "Cream", category: "Gifts", description: "A sweet amigurumi bunny, ready to be someone's new best friend." },
];

export const categories = [
  { name: "Bags", note: "Carry a little joy", image: images.blueBag, href: "/shop?category=bags" },
  { name: "Flowers", note: "Blooms that last", image: images.flowers, href: "/shop?category=flowers" },
  { name: "Wearables", note: "Softly made for you", image: images.sweater, href: "/shop?category=wearables" },
  { name: "Gifts", note: "Small, thoughtful things", image: images.rabbit, href: "/shop?category=gifts" },
];

export const values = [
  { num: "01", title: "Made by hand", text: "Every stitch, thoughtfully placed" },
  { num: "02", title: "Natural materials", text: "Soft, lasting & responsibly sourced" },
  { num: "03", title: "Wrapped with care", text: "A little joy in every parcel" },
];

export const testimonials = [
  { id: 1, quote: "Even more beautiful in person. You can feel how much care went into every stitch — it's already the most special piece in my wardrobe.", author: "Elena C.", initials: "EC", detail: "Verified buyer · Marlow Market Tote", rating: 5 },
];

export const announcementBar = {
  left: "Free US shipping on orders $100+",
  center: "Spring drop is here — shop the new collection",
  currency: "USD",
};

