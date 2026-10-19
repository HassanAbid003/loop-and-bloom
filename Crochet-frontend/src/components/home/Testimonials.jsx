// import { useRef } from "react";
// import { testimonials } from "../../data/site";
// import Icon from "../ui/Icon";
// import { useReveal } from "../../hooks/useReveal";

// export default function Testimonials() {
//   const ref = useRef(null);
//   useReveal(ref);

//   return (
//     <section ref={ref} className="py-24 md:py-32 bg-ivory">
//       <div className="max-w-3xl mx-auto px-8 text-center">
//         <div className="reveal">
//           <div className="flex items-center justify-center gap-4 mb-6">
//             <span className="w-12 h-px bg-taupe" />
//             <span className="section-eyebrow">Kind words</span>
//             <span className="w-12 h-px bg-taupe" />
//           </div>
//           <h2 className="font-serif text-5xl md:text-6xl mb-16">
//             Loved by <span className="italic text-taupe">you</span>
//           </h2>
//         </div>

//         {testimonials.map((t) => (
//           <div key={t.id} className="reveal">
//             {/* Stars */}
//             <div className="flex items-center justify-center gap-1 text-rose mb-8">
//               {Array.from({ length: t.rating }).map((_, i) => (
//                 <Icon key={i} name="star" size={16} />
//               ))}
//             </div>

//             {/* Quote */}
//             <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug text-charcoal mb-10">
//               "{t.quote}"
//             </blockquote>

//             {/* Author */}
//             <div className="flex items-center justify-center gap-4">
//               <div className="w-12 h-12 rounded-full bg-charcoal text-cream flex items-center justify-center
//                               text-sm font-medium tracking-widest">
//                 {t.initials}
//               </div>
//               <div className="text-left">
//                 <div className="font-medium text-sm">{t.author}</div>
//                 <div className="text-xs text-charcoal/50 font-light mt-0.5">
//                   {t.detail}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }







import { useRef } from "react";
import { testimonials } from "../../data/site";
import Icon from "../ui/Icon";
import { useReveal } from "../../hooks/useReveal";

export default function Testimonials() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    // Changed background to brown
    <section ref={ref} className="py-20 md:py-20 bg-brown">
      <div className="max-w-5xl mx-auto px-8 text-center">
        
        {/* Header */}
        <div className="reveal">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-white/40" />
            <span className="text-xs tracking-ultra-wide uppercase text-white/80 font-medium">
              Kind words
            </span>
            <span className="w-12 h-px bg-white/40" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-12">
            Loved by
          </h2>
        </div>

        {/* Testimonial Card */}
        {testimonials.map((t) => (
          <div key={t.id} className="reveal bg-cream p-12 md:p-20 shadow-xl">
            
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 text-taupe mb-8">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Icon key={i} name="star" size={16} />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-serif italic text-2xl md:text-3xl lg:text-4xl leading-snug text-charcoal mb-10">
              "{t.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose text-white flex items-center justify-center
                              text-sm font-medium tracking-widest">
                {t.initials}
              </div>
              <div className="text-left">
                <div className="font-medium text-sm text-charcoal">{t.author}</div>
                <div className="text-xs text-charcoal/60 font-light mt-0.5">
                  {t.detail}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}