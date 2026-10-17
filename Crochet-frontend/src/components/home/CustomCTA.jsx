import { useRef } from "react";
import Icon from "../ui/Icon";
import { brand } from "../../data/site";   
import { useReveal } from "../../hooks/useReveal";

export default function CustomCTA() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section ref={ref} id="custom" className="bg-charcoal text-cream py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center reveal">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-rose" />
            <span className="text-xs tracking-ultra-wide uppercase text-rose font-medium">
              Something only yours
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            Dream it.<br />
            <span className="italic text-rose">We'll crochet it.</span>
          </h2>
        </div>

        <div>
          <p className="text-cream/70 font-light leading-relaxed mb-8 text-lg">
            Choose your color, shape, and special details. Together, we'll create
            a one-of-a-kind piece that feels completely you.
          </p>
          <a
            href={`mailto:${brand.email}`}
            className="inline-flex items-center gap-3 text-xs tracking-widest uppercase
                       bg-cream text-charcoal px-8 py-4 hover:bg-rose hover:text-white
                       transition-colors duration-300"
          >
            Start a custom request <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}