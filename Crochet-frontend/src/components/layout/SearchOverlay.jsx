import { useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useUI } from "../../context/UIContext";

const POPULAR = [
  "Market totes",
  "Crochet flowers",
  "Ready to ship",
  "Gifts under $50",
];

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Focus the input when opened, clear on close
  useEffect(() => {
    if (searchOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 100);
      return () => window.clearTimeout(t);
    }
    setQuery("");
  }, [searchOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && searchOpen) closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, closeSearch]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // TODO: wire to real search page/API
    // navigate(`/search?q=${encodeURIComponent(query)}`);
    closeSearch();
  };

  const handleChipClick = (term) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <div
      role="dialog"
      aria-label="Search"
      aria-hidden={!searchOpen}
      className={`fixed inset-0 z-[60] transition-opacity duration-300
                  ${searchOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
      />

      {/* Panel — half-page, slides down from top */}
      <div
        className={`relative w-full h-[38vh] min-h-[320px] bg-cream
                    transition-transform duration-500 ease-out
                    ${searchOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="h-full max-w-[1400px] mx-auto px-8 py-10 md:py-12 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-[11px] tracking-ultra-wide uppercase text-taupe font-medium">
              Find something special
            </p>
            <button
              onClick={closeSearch}
              aria-label="Close search"
              className="p-2 -m-2 hover:text-taupe transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Search form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex items-center gap-4 border-b border-charcoal pb-4">
              <FiSearch className="w-6 h-6 md:w-7 md:h-7 shrink-0 text-charcoal/70" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bags, flowers, gifts..."
                className="flex-1 bg-transparent outline-none font-serif
                           text-2xl md:text-3xl lg:text-4xl
                           placeholder-charcoal/30 text-charcoal"
              />
            </div>
          </form>

          {/* Popular searches */}
          <div>
            <p className="text-[11px] tracking-ultra-wide uppercase text-taupe font-medium mb-3">
              Popular searches
            </p>
            <div className="flex flex-wrap gap-3">
              {POPULAR.map((term) => (
                <button
                  key={term}
                  onClick={() => handleChipClick(term)}
                  className="border border-sand px-5 py-2 text-sm text-charcoal
                             hover:border-charcoal hover:bg-charcoal hover:text-cream
                             transition-colors duration-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}