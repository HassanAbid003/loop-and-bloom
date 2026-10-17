import { useRef } from "react";
import { images } from "../../data/site";
import Icon from "../ui/Icon";
import { useReveal } from "../../hooks/useReveal";

export default function StorySection() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section ref={ref} id="story" className="py-24 md:py-32 bg-cream">
      <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image collage */}
        <div className="relative reveal">
          <img
            src={images.maker}
            alt="Maker stitching a textile by hand"
            className="w-full aspect-[4/5] object-cover"
          />
          <img
            src={images.textile}
            alt="Detail of a cream hand-knit textile"
            className="hidden md:block absolute -bottom-12 -right-12 w-56 h-56 object-cover
                       border-8 border-cream shadow-xl"
          />
        </div>

        {/* Text */}
        <div className="reveal">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-taupe" />
            <span className="section-eyebrow">Behind every loop</span>
          </div>

          <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] mb-8">
            From my hands<br />
            to <span className="italic text-taupe">your home.</span>
          </h2>

          <blockquote className="font-serif italic text-2xl text-taupe border-l-2 border-rose pl-6 mb-8">
            "I believe the things we live with should carry a story."
          </blockquote>

          <p className="text-charcoal/70 font-light leading-relaxed mb-6">
            Loop & Bloom began at my grandmother's kitchen table, where I learned
            that making something slowly is its own kind of love. Today, each piece
            is still created by hand in small batches, with the same care in every stitch.
          </p>
          <p className="text-charcoal/70 font-light leading-relaxed mb-8">
            Thank you for choosing handmade — and for giving these pieces a place in your story.
          </p>

          <div className="mb-8">
            <div className="font-serif italic text-3xl text-charcoal mb-1">Maya</div>
            <div className="text-[11px] tracking-[0.25em] uppercase text-charcoal/50">
              Founder & Maker
            </div>
          </div>

          <a href="/about" className="btn-primary">
            Read our full story <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}