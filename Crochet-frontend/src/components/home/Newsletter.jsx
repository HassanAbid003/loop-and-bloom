import { useRef, useState } from "react";
import Icon from "../ui/Icon";
import { useReveal } from "../../hooks/useReveal";

export default function Newsletter() {
  const ref = useRef(null);
  useReveal(ref);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to email service (Mailchimp, ConvertKit, etc.)
    setSubmitted(true);
    setEmail("");
    window.setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section ref={ref} className="bg-ivory py-24 md:py-32 border-t border-sand/60">
      <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center reveal">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-taupe" />
            <span className="section-eyebrow">Notes from the studio</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">
            A little softness<br />
            in your <span className="italic text-taupe">inbox.</span>
          </h2>
        </div>

        <div>
          <p className="text-charcoal/70 font-light leading-relaxed mb-8">
            New drops, studio stories, and a welcome treat — sent gently, never too often.
          </p>

          <form onSubmit={handleSubmit} className="mb-4">
            <label className="flex items-center border-b border-charcoal/30 pb-3">
              <input
                required
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none text-charcoal placeholder-charcoal/40 py-2"
              />
              <button
                type="submit"
                aria-label="Join newsletter"
                className="ml-4 text-charcoal hover:text-taupe transition-colors"
              >
                <Icon name="arrow" size={20} />
              </button>
            </label>
          </form>

          {submitted ? (
            <p className="text-taupe text-sm flex items-center gap-2">
              <Icon name="check" size={16} /> Welcome to the circle. Check your inbox.
            </p>
          ) : (
            <p className="text-xs text-charcoal/40 font-light">
              By subscribing, you agree to our privacy policy.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}