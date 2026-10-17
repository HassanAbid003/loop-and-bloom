import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "loop-and-bloom-wishlist-v3";

function normalizeProduct(raw) {
  if (!raw) return null;
  const id = raw.id || raw._id;
  if (!id) return null;

  return {
    id: String(id),
    name: raw.name || "Untitled",
    price: Number(raw.price) || 0,
    image:
      raw.image ||
      (Array.isArray(raw.images) && raw.images[0]) ||
      "",
    color: raw.color || (Array.isArray(raw.colors) && raw.colors[0]) || "",
  };
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed)
        ? parsed.map(normalizeProduct).filter(Boolean)
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    const normalized = normalizeProduct(product);
    if (!normalized) {
      console.warn("wishlist.addItem: invalid product, ignored", product);
      return;
    }
    setItems((prev) =>
      prev.find((i) => i.id === normalized.id) ? prev : [...prev, normalized]
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggle = (product) => {
    const normalized = normalizeProduct(product);
    if (!normalized) {
      console.warn("wishlist.toggle: invalid product, ignored", product);
      return;
    }
    setItems((prev) =>
      prev.find((i) => i.id === normalized.id)
        ? prev.filter((i) => i.id !== normalized.id)
        : [...prev, normalized]
    );
  };

  const isSaved = (id) => items.some((i) => i.id === id);
  const clear = () => setItems([]);

  const value = {
    items,
    count: items.length,
    addItem,
    removeItem,
    toggle,
    isSaved,
    clear,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}