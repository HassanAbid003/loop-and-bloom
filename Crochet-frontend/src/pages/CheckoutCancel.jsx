import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function CheckoutCancel() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20 px-8">
      <div className="max-w-lg w-full text-center">
        <p className="text-[11px] tracking-ultra-wide uppercase text-taupe font-medium mb-4">
          Checkout paused
        </p>
        <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
          No worries.<br />
          <span className="italic text-taupe">Your cart is safe.</span>
        </h1>
        <p className="text-charcoal/70 font-light leading-relaxed mb-8">
          Your items are still in your bag whenever you're ready.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-3 bg-charcoal text-cream
                     px-8 py-4 text-xs tracking-widest uppercase hover:bg-taupe transition-colors"
        >
          Return to shop <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}