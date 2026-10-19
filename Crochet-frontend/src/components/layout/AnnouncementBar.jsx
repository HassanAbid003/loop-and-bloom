
// export default function AnnouncementBar() {
//   return (
//     <div className="bg-charcoal text-cream text-[11px] tracking-[0.2em] uppercase">
//       <div className="max-w-[1600px] mx-auto px-7 py-3 flex items-center justify-between relative">
//         <span>Free US Shipping on Orders $100+</span>

//         {/* Absolutely centered, then shifted left */}
//         <span className="hidden md:block absolute left-[57%] -translate-x-[60%]">
//           Spring Drop Is Here — Shop the New Collection
//         </span>

//         <button className="flex items-center gap-2 cursor-pointer hover:text-rose transition-colors">
//           USD<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
//         </button>
//       </div>
//     </div>
//   )
// }





import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function AnnouncementBar() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // Fetch public settings (route is mounted under /products in the backend)
    api.get("/products/settings")
      .then(setSettings)
      .catch((err) => console.error("Failed to load settings", err)); 
  }, []);

  if (!settings || !settings.announcementActive) return null;

  return (
    <div className="bg-charcoal text-cream text-[11px] tracking-[0.2em] uppercase">
      <div className="max-w-[1600px] mx-auto px-7 py-3 flex items-center justify-between relative">
        <span>{settings.announcementLeft}</span>

        <span className="hidden md:block absolute left-[57%] -translate-x-[60%]">
          {settings.announcementCenter}
        </span>
        <button className="flex items-center gap-2 cursor-pointer hover:text-rose transition-colors">
           USD<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </button>
      </div>
    </div>
  );
}