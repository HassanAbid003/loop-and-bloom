import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { useUI } from "../../context/UIContext";
import { productsApi } from "../../lib/api";

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // 1. Fetch all products when the overlay opens (only once)
  useEffect(() => {
    if (searchOpen && allProducts.length === 0) {
      setLoading(true);
      productsApi.list({ limit: 100 })
        .then((res) => setAllProducts(res.products))
        .catch((err) => console.error("Failed to load products for search:", err))
        .finally(() => setLoading(false));
    }
  }, [searchOpen, allProducts.length]);

  // 2. Filter products as the user types
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = allProducts.filter((p) => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
    setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
  }, [query, allProducts]);

  // Focus input on open, reset on close
  useEffect(() => {
    if (searchOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 100);
      return () => window.clearTimeout(t);
    }
    setQuery("");
    setSuggestions([]);
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && searchOpen) closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, closeSearch]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  const handleSuggestionClick = (product) => {
    closeSearch();
    // Navigate to shop page with the specific product search, OR ideally to a product detail page if you have one.
    // Since you don't have product detail pages yet, let's go to the shop filtered by this exact name.
    navigate(`/shop?search=${encodeURIComponent(product.name)}`);
  };

  return (
    <div
      role="dialog"
      aria-label="Search"
      className={`fixed inset-0 z-[60] transition-opacity duration-300
                  ${searchOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      {/* Backdrop */}
      <div onClick={closeSearch} className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className={`relative w-full h-[38vh] min-h-[320px] bg-cream
                    transition-transform duration-500 ease-out
                    ${searchOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="h-full max-w-[1400px] mx-auto px-8 py-10 md:py-12 flex flex-col relative">
          
          <div className="flex items-center justify-between mb-8">
            <p className="text-[11px] tracking-ultra-wide uppercase text-taupe font-medium">Find something special</p>
            <button onClick={closeSearch} className="p-2 -m-2 hover:text-taupe transition-colors">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="flex items-center gap-4 border-b border-charcoal pb-4">
              <FiSearch className="w-6 h-6 md:w-7 md:h-7 shrink-0 text-charcoal/70" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bags, flowers, gifts..."
                className="flex-1 bg-transparent outline-none font-serif text-2xl md:text-3xl lg:text-4xl placeholder-charcoal/30 text-charcoal"
              />
            </div>

            {/* Suggestions Dropdown */}
            {query.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-sand shadow-2xl rounded-xl overflow-hidden z-50 max-h-[40vh] overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-charcoal/50 text-sm">Loading...</div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => handleSuggestionClick(product)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-ivory transition-colors text-left border-b border-sand/50 last:border-0"
                    >
                      <img src={product.images?.[0]} alt={product.name} className="w-12 h-12 object-cover rounded bg-sand" />
                      <div>
                        <p className="font-serif text-lg text-charcoal">{product.name}</p>
                        <p className="text-xs text-charcoal/50 uppercase tracking-wider">{product.category}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-charcoal/50 text-sm">
                    No products found for "{query}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Popular searches (only show when not typing) */}
          {!query.trim() && (
            <div className="mt-8">
              <p className="text-[11px] tracking-ultra-wide uppercase text-taupe font-medium mb-3">Popular searches</p>
              <div className="flex flex-wrap gap-3">
                {["Tote", "Bunny", "Flowers", "Cardigan"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="border border-sand px-5 py-2 text-sm text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-cream transition-colors duration-300"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}