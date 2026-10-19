// import { useRef } from "react";
// import { images } from "../../data/site";
// import Icon from "../ui/Icon";
// import { useReveal } from "../../hooks/useReveal";

// export default function SeasonalEdit() {
//   const ref = useRef(null);
//   useReveal(ref);

//   return (
//     <section ref={ref} className="bg-ivory ">
//       <div className="grid md:grid-cols-2 min-h-[600px] reveal">
//         {/* Image side */}
//         <div className="relative overflow-hidden min-h-[400px]">
//           <img
//             src={images.yarn}
//             alt="Soft natural yarns in spring colors"
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//         </div>

//         {/* Text side */}
//         <div className="flex items-center px-8 md:px-16 lg:px-24 py-24">
//           <div className="max-w-md">
//             <div className="flex items-center gap-4 mb-6">
//               <span className="w-12 h-px bg-taupe" />
//               <span className="section-eyebrow">The spring edit</span>
//             </div>

//             <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8">
//               Soft color.<br />
//               Lighter <span className="italic text-taupe">days.</span>
//             </h2>

//             <p className="text-charcoal/70 font-light leading-relaxed mb-10">
//               A collection inspired by slow mornings, garden blooms, and the
//               first warm light of the season.
//             </p>

//             <a
//               href="/shop"
//               className="inline-flex items-center gap-3 text-xs tracking-widest uppercase
//                          bg-charcoal text-cream px-8 py-4 hover:bg-taupe
//                          transition-colors duration-300 mb-6"
//             >
//               Shop the edit <Icon name="arrow" size={16} />
//             </a>

//             <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50">
//               Limited pieces available
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }






import { useRef } from "react";
import { images } from "../../data/site";
import Icon from "../ui/Icon";
import { useReveal } from "../../hooks/useReveal";

export default function SeasonalEdit() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    // 1. Outer section has the cream background and adds spacing from the edges of the screen
    <section ref={ref} className="bg-ivory px-4 md:px-8 py-0 md:py-0">
      
      {/* 2. Inner container is the sage green box */}
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 min-h-[600px] reveal bg-sage text-white">
        
        {/* 3. Image side - Note the padding (p-8) around the image to create the border effect */}
        <div className="relative flex items-center justify-center py-8 px-4 md:py-12 px-6">
          <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
            <img
              src={images.yarn}
              alt="Soft natural yarns in spring colors"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4. Text side */}
        <div className="flex items-center px-8 md:px-16 lg:px-16 py-16 md:py-0">
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-white/70" />
              <span className="text-xs tracking-ultra-wide uppercase text-white/90 font-medium">
                The spring edit
              </span>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8">
              Soft color.<br />
              Lighter <span className="italic text-rose">days.</span>
            </h2>

            <p className="text-white/80 font-light leading-relaxed mb-10 text-lg">
              A collection inspired by slow mornings, garden blooms, and the
              first warm light of the season.
            </p>

            <a
              href="/shop"
              className="inline-flex items-center gap-3 text-xs tracking-widest uppercase
                         bg-charcoal text-cream px-8 py-4 hover:bg-taupe
                         transition-colors duration-300 mb-6"
            >
              Shop the edit <Icon name="arrow" size={16} />
            </a>

            <p className="text-[11px] tracking-[0.2em] uppercase text-white/60">
              Limited pieces available
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}