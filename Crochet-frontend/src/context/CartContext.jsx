import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "loop-and-bloom-cart-v3"; // bumped — kills stale v2 data

// Normalize ANY incoming product shape into a consistent cart item.
// Handles: frontend shape {id}, backend shape {_id}, wishlist items, etc.
function normalizeProduct(raw) {
  if (!raw) return null;
  const id = raw.id || raw._id;
  if (!id) return null; // reject items without an id

  return {
    id: String(id),
    name: raw.name || "Untitled",
    price: Number(raw.price) || 0,
    image:
      raw.image ||
      (Array.isArray(raw.images) && raw.images[0]) ||
      "",
    color: raw.color || (Array.isArray(raw.colors) && raw.colors[0]) || "",
    qty: 1,
  };
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const incoming = normalizeProduct(action.payload);
      if (!incoming) {
        console.warn("addItem: invalid product, ignored", action.payload);
        return state;
      }

      const existing = state.items.find((i) => i.id === incoming.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === incoming.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, incoming] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case "SET_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) return { ...state, items: state.items.filter((i) => i.id !== id) };
      return {
        ...state,
        items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

function loadInitialState() {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalQty = state.items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const value = {
    items: state.items,
    totalQty,
    subtotal,
    addItem: (product) => dispatch({ type: "ADD", payload: product }),
    removeItem: (id) => dispatch({ type: "REMOVE", payload: id }),
    setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}