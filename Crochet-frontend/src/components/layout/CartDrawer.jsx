import { Link, useNavigate } from "react-router-dom";
import { FiX, FiPlus, FiMinus, FiCheck, FiTrash2 } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useUI } from "../../context/UIContext";
import { useState } from "react";
import { checkoutApi } from "../../lib/api";
import { useUserAuth } from "../../context/UserAuthContext";

export default function CartDrawer() {
  const { items, subtotal, totalQty, setQty, removeItem } = useCart();
  const { cartOpen, closeCart } = useUI();
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();
  const FREE_SHIPPING_THRESHOLD = 100;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const { token } = useUserAuth();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          cartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-cream z-50
                    flex flex-col transition-transform duration-400 ease-out
                    ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-sand/60">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-taupe mb-1">
              Your selection
            </p>
            <h2 className="font-serif text-2xl">
              Shopping bag <span className="text-charcoal/40">({totalQty})</span>
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 -m-2 hover:text-taupe transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress */}
        {totalQty > 0 && (
          <div className="px-6 py-4 bg-ivory border-b border-sand/60">
            {hasFreeShipping ? (
              <p className="text-xs flex items-center gap-2 text-taupe">
                <FiCheck className="w-4 h-4" /> You've unlocked free shipping!
              </p>
            ) : (
              <p className="text-xs text-charcoal/70">
                Add <b>${remaining.toFixed(2)}</b> more for free shipping
              </p>
            )}
            <div className="mt-2 h-1 bg-sand rounded-full overflow-hidden">
              <div
                className="h-full bg-taupe transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <p className="font-serif text-2xl mb-3 text-charcoal/60">
                Your bag is empty
              </p>
              <p className="text-sm text-charcoal/50 font-light mb-6">
                Every great piece starts with one loop.
              </p>
              <button
                onClick={closeCart}
                className="btn-primary"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="p-6 space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-sand shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-taupe mb-1">
                      {item.color}
                    </p>
                    <h3 className="font-serif text-base truncate">{item.name}</h3>
                    <p className="text-xs text-charcoal/50 mt-0.5">
                      ${item.price}.00
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-charcoal/20">
                        <button
                          onClick={() => setQty(item.id, item.qty - 1)}
                          aria-label="Decrease quantity"
                          className="px-2 py-1 hover:bg-sand/40 transition-colors"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm tabular-nums">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.id, item.qty + 1)}
                          aria-label="Increase quantity"
                          className="px-2 py-1 hover:bg-sand/40 transition-colors"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-charcoal/40 hover:text-charcoal transition-colors p-1"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif text-base">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sand/60 p-6 space-y-4 bg-cream">
            <div className="flex justify-between items-center">
              <span className="text-sm tracking-widest uppercase">Subtotal</span>
              <span className="font-serif text-xl">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-charcoal/50">
              Taxes and shipping calculated at checkout
            </p>
            <button
              onClick={async () => {
                if (checkingOut) return;
                setCheckingOut(true);
                try {
                  const res = await checkoutApi.createSession(items, null, token);
                  if (res?.url) {
                    // Redirect to Stripe-hosted checkout
                    window.location.href = res.url;
                  } else {
                    throw new Error("Stripe session missing URL");
                  }
                } catch (err) {
                  console.error("Checkout failed:", err);
                  alert("Could not start checkout. Please try again.");
                  setCheckingOut(false);
                }
              }}
              disabled={checkingOut}
              className="w-full bg-charcoal text-cream py-4 text-xs tracking-widest uppercase
                        hover:bg-taupe transition-colors disabled:opacity-60 disabled:cursor-wait"
            >
              {checkingOut ? "Redirecting…" : "Checkout securely"}
            </button>
            <button
              onClick={closeCart}
              className="w-full text-xs tracking-widest uppercase text-charcoal/60 hover:text-charcoal transition-colors py-2"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}