import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiMail } from "react-icons/fi";
import { brand } from "../../data/site";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "New arrivals", href: "/shop" },
      { label: "Bestsellers", href: "/shop" },
      { label: "Collections", href: "/collections" },
      { label: "Custom orders", href: "/custom" },
      { label: "Gift cards", href: "/gift-cards" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Meet the maker", href: "/about" },
      { label: "Materials & care", href: "/materials" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/faq" },
      { label: "Shipping & returns", href: "/shipping" },
      { label: "Track your order", href: "/track" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      {/* Newsletter strip is in Newsletter.jsx */}

      {/* Main */}
      <div className="max-w-[1400px] mx-auto px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full border border-cream/30 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="12" r="3" />
                <circle cx="12" cy="12" r="7" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div className="leading-none">
              <div className="font-serif text-base tracking-wide">
                LOOP <span className="italic text-rose">&</span> BLOOM
              </div>
              <div className="text-[9px] tracking-[0.4em] text-rose mt-1">
                HANDMADE WITH HEART
              </div>
            </div>
          </div>
          <p className="text-cream/60 text-sm font-light leading-relaxed mb-6">
            Thoughtful crochet pieces, made slowly and sent with love from our studio to your home.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-rose transition-colors">
              <FiInstagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-rose transition-colors">
              <FiFacebook className="w-5 h-5" />
            </a>
            <a href={`mailto:${brand.email}`} aria-label="Email" className="hover:text-rose transition-colors">
              <FiMail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs tracking-[0.3em] uppercase text-rose mb-6">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-cream/10">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/50">
          <span>© {new Date().getFullYear()} {brand.name}. Made with care.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-cream transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-cream transition-colors">Terms</Link>
            <Link to="/accessibility" className="hover:text-cream transition-colors">Accessibility</Link>
          </div>
          <span className="tracking-widest">VISA · MC · AMEX</span>
        </div>
      </div>
    </footer>
  );
}