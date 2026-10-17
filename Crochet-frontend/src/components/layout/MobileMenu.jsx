import { Link } from "react-router-dom";
import { FiX, FiArrowRight } from "react-icons/fi";
import { useUI } from "../../context/UIContext";
import { navLinks, brand } from "../../data/site";

export default function MobileMenu() {
  const { menuOpen, closeMenu } = useUI();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Panel — slides in from left */}
      <aside
        role="dialog"
        aria-label="Menu"
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-cream z-50
                    flex flex-col transition-transform duration-400 ease-out
                    ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sand/60">
          <div className="font-serif text-xl tracking-wide">
            LOOP <span className="italic text-taupe">&</span> BLOOM
          </div>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-2 -m-2 hover:text-taupe transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 p-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={closeMenu}
              className="flex items-center justify-between py-5 border-b border-sand/60
                         hover:text-taupe transition-colors group"
            >
              <span className="flex items-baseline gap-4">
                <span className="text-[10px] text-taupe font-serif italic">
                  0{i + 1}
                </span>
                <span className="font-serif text-2xl">{link.label}</span>
              </span>
              <FiArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-sand/60 space-y-3">
          <p className="text-xs text-charcoal/60 font-light">
            Handmade slowly in {brand.location}.
          </p>
          <a
            href={`mailto:${brand.email}`}
            className="text-xs tracking-widest uppercase text-taupe hover:text-charcoal transition-colors"
          >
            {brand.email}
          </a>
        </div>
      </aside>
    </>
  );
}