// import { useRef, useState } from "react";
// import Icon from "../ui/Icon";
// import { useReveal } from "../../hooks/useReveal";

// export default function Newsletter() {
//   const ref = useRef(null);
//   useReveal(ref);
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email) return;
//     // TODO: wire to email service (Mailchimp, ConvertKit, etc.)
//     setSubmitted(true);
//     setEmail("");
//     window.setTimeout(() => setSubmitted(false), 4000);
//   };

//   return (
//     <section ref={ref} className="bg-ivory py-24 md:py-32 border-t border-sand/60">
//       <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center reveal">
//         <div>
//           <div className="flex items-center gap-4 mb-6">
//             <span className="w-12 h-px bg-taupe" />
//             <span className="section-eyebrow">Notes from the studio</span>
//           </div>
//           <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">
//             A little softness<br />
//             in your <span className="italic text-taupe">inbox.</span>
//           </h2>
//         </div>

//         <div>
//           <p className="text-charcoal/70 font-light leading-relaxed mb-8">
//             New drops, studio stories, and a welcome treat — sent gently, never too often.
//           </p>

//           <form onSubmit={handleSubmit} className="mb-4">
//             <label className="flex items-center border-b border-charcoal/30 pb-3">
//               <input
//                 required
//                 type="email"
//                 placeholder="Your email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="flex-1 bg-transparent outline-none text-charcoal placeholder-charcoal/40 py-2"
//               />
//               <button
//                 type="submit"
//                 aria-label="Join newsletter"
//                 className="ml-4 text-charcoal hover:text-taupe transition-colors"
//               >
//                 <Icon name="arrow" size={20} />
//               </button>
//             </label>
//           </form>

//           {submitted ? (
//             <p className="text-taupe text-sm flex items-center gap-2">
//               <Icon name="check" size={16} /> Welcome to the circle. Check your inbox.
//             </p>
//           ) : (
//             <p className="text-xs text-charcoal/40 font-light">
//               By subscribing, you agree to our privacy policy.
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }












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
    <section ref={ref} className="">
      
      {/* This is the inner green box */}
      <div className="max-w-[1500px] mx-auto bg-[#5C7057] px-2 lg:px-28 py-24 md:py-32 reveal">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-26 items-center">
          
          {/* Left Side */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-white/40" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-white/80 font-medium">
                Notes from the studio
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white">
              A little softness<br />
              in your <span className="italic text-brown">inbox.</span>
            </h2>
          </div>

          {/* Right Side */}
          <div>
            <p className="text-white/90 font-light leading-relaxed text-lg mb-10 max-w-md">
              New drops, studio stories, and a welcome treat — sent gently, never too often.
            </p>

            <form onSubmit={handleSubmit} className="mb-4">
              <label className="flex items-center border-b border-white/40 pb-4">
                <input
                  required
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white placeholder-white/60 text-lg font-light"
                />
                <button
                  type="submit"
                  aria-label="Join newsletter"
                  className="ml-4 text-white hover:text-rose transition-colors"
                >
                  <Icon name="arrow" size={20} />
                </button>
              </label>
            </form>

            {submitted ? (
              <p className="text-white text-sm flex items-center gap-2 mt-4">
                <Icon name="check" size={16} /> Welcome to the circle. Check your inbox.
              </p>
            ) : (
              <p className="text-[11px] text-white/50 font-light mt-4">
                By subscribing, you agree to our privacy policy.
              </p>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}