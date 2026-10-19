import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiMenu } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useUI } from "../../context/UIContext";

export default function Navbar() {
  const { totalQty } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [activeSection, setActiveSection] = useState("");
  
  // FIXED: Added openAccount here
  const { openCart, openMenu, openSearch, openWishlist, openAccount } = useUI();
  const location = useLocation();

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/shop" },
    { label: "Our Story", href: "/about" },
    { label: "Custom", href: "/about" },
  ];

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionIds = ["shop", "collections", "story", "custom"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <header className="bg-cream border-b border-sand/60 sticky top-0 z-40">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-9 py-5 lg:py-4 flex items-center justify-between gap-4">
        
        <button
          onClick={openMenu}
          aria-label="Open menu"
          className="lg:hidden p-2 -ml-2"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        <Link to="/" className="flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-charcoal/30 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="12" r="7" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-serif text-lg lg:text-xl tracking-wide">
              LOOP <span className="italic text-taupe">&</span> BLOOM
            </div>
            <div className="text-[9px] tracking-[0.4em] text-taupe mt-1 hidden sm:block">
              HANDMADE WITH HEART
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => {
            const isActive = 
              (location.pathname === "/" && activeSection && link.href.includes(activeSection)) ||
              (location.pathname === link.href && link.label !== "Collections" && link.label !== "Custom");

            return (
              <Link
                key={link.label}
                to={link.href}
                className={`relative text-sm transition-colors pb-1 ${
                  isActive ? "text-taupe" : "text-charcoal hover:text-taupe"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 right-0 -bottom-1 h-px bg-taupe transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5 lg:gap-6">
          <button
            aria-label="Open search"
            onClick={openSearch}
            className="hidden sm:block hover:text-taupe transition-colors"
          >
            <FiSearch className="w-5 h-5" />
          </button>
          
          {/* User Icon - FIXED */}
          <button 
            aria-label="Account" 
            onClick={openAccount}
            className="hidden sm:block hover:text-taupe transition-colors"
          >
            <FiUser className="w-5 h-5" />
          </button>
          
          <button
            aria-label={`Wishlist with ${wishlistCount} items`}
            onClick={openWishlist}
            className="hidden sm:block relative hover:text-taupe transition-colors"
          >
            <FiHeart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
          
          <button
            aria-label={`Cart with ${totalQty} items`}
            className="relative hover:text-taupe transition-colors"
            onClick={openCart}
          >
            <FiShoppingBag className="w-5 h-5" />
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-charcoal text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}