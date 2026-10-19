// import { useRef } from "react";
// import Icon from "../ui/Icon";
// import { brand } from "../../data/site";   
// import { useReveal } from "../../hooks/useReveal";

// export default function CustomCTA() {
//   const ref = useRef(null);
//   useReveal(ref);

//   return (
//     <section ref={ref} id="custom" className="bg-charcoal text-cream py-24 md:py-32">
//       <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center reveal">
//         <div>
//           <div className="flex items-center gap-4 mb-6">
//             <span className="w-12 h-px bg-rose" />
//             <span className="text-xs tracking-ultra-wide uppercase text-rose font-medium">
//               Something only yours
//             </span>
//           </div>
//           <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
//             Dream it.<br />
//             <span className="italic text-rose">We'll crochet it.</span>
//           </h2>
//         </div>

//         <div>
//           <p className="text-cream/70 font-light leading-relaxed mb-8 text-lg">
//             Choose your color, shape, and special details. Together, we'll create
//             a one-of-a-kind piece that feels completely you.
//           </p>
//           <a
//             href={`mailto:${brand.email}`}
//             className="inline-flex items-center gap-3 text-xs tracking-widest uppercase
//                        bg-cream text-charcoal px-8 py-4 hover:bg-rose hover:text-white
//                        transition-colors duration-300"
//           >
//             Start a custom request <Icon name="arrow" size={16} />
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useRef } from "react";
import Icon from "../ui/Icon";
import { brand } from "../../data/site";
import { useReveal } from "../../hooks/useReveal";

export default function CustomCTA() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section 
      ref={ref} 
      id="custom" 
      className="relative py-24 md:py-32 bg-ivory overflow-hidden"
    >
      {/* 
        The diagonal pink block. 
        We make it exactly 50% wide, place it on the right, and skew it.
        origin-bottom keeps the bottom center anchored.
      */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-[50%] bg-rose/25 origin-bottom"
        style={{ transform: "skewX(-15deg)" }} 
      />

      {/* The container. Split 50/50 using lg:grid-cols-2 */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center reveal">
        
        {/* LEFT SIDE: Text */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-taupe" />
            <span className="text-xs tracking-ultra-wide uppercase text-taupe font-medium">
              Something only yours
            </span>
          </div>
          
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            Dream it.<br />
            <span className="italic text-brown">We'll crochet it.</span>
          </h2>
        </div>

        {/* RIGHT SIDE: Centered Text & Button */}
        <div className="flex flex-col justify-center items-center text-center gap-10 h-full">
          <p className="text-charcoal/70 font-light leading-relaxed max-w-md text-lg">
            Choose your color, shape, and special details. Together, we'll create
            a one-of-a-kind piece that feels completely you.
          </p>
          
          <a
            href={`mailto:${brand.email}`}
            className="inline-flex items-center justify-center gap-3 text-xs tracking-widest uppercase
                       bg-charcoal text-cream px-8 py-5 hover:bg-brown
                       transition-colors duration-300 whitespace-nowrap shadow-lg"
          >
            Start a custom request <Icon name="arrow" size={16} />
          </a>
        </div>
        
      </div>
    </section>
  );
}