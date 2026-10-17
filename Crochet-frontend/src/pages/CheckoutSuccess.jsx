import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { checkoutApi } from "../lib/api";
import { useCart } from "../context/CartContext";

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { clear } = useCart();

  // Ref to make sure we only clear the cart and fetch the order ONCE
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    // Clear the cart — order is placed
    clear();

    async function loadOrder() {
      if (!sessionId) {
        setLoading(false);
        return;
      }
      try {
        const data = await checkoutApi.getOrder(sessionId);
        setOrder(data);
      } catch (err) {
        console.warn("Could not fetch order:", err.message);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20 px-8">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-rose/20 flex items-center justify-center mx-auto mb-8">
          <FiCheck className="w-8 h-8 text-rose" />
        </div>

        <p className="text-[11px] tracking-ultra-wide uppercase text-taupe font-medium mb-4">
          Order confirmed
        </p>

        <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
          Thank you.<br />
          <span className="italic text-taupe">Wrapped with love.</span>
        </h1>

        <p className="text-charcoal/70 font-light leading-relaxed mb-8">
          {loading
            ? "Fetching your order details…"
            : order?.orderNumber
            ? `Your order ${order.orderNumber} has been received. A confirmation email is on its way.`
            : "Your order has been received. A confirmation email is on its way."}
        </p>

        {order && (
          <div className="bg-ivory border border-sand/60 p-6 text-left mb-8 space-y-3">
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-charcoal/80">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-sand/60 pt-3 flex justify-between font-serif text-lg">
              <span>Total</span>
              <span>${order.total?.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 bg-charcoal text-cream
                       px-8 py-4 text-xs tracking-widest uppercase hover:bg-taupe transition-colors"
          >
            Back to home <FiArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-3 text-xs tracking-widest uppercase
                       border border-charcoal px-8 py-4 hover:bg-charcoal hover:text-cream transition-colors"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    </section>
  );
}