import { FiX, FiPlus, FiShoppingBag } from "react-icons/fi";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useUI } from "../../context/UIContext";

export default function WishlistDrawer() {
  const { items, count, removeItem, clear } = useWishlist();
  const { addItem } = useCart();
  const { wishlistOpen, closeWishlist, showToast, openCart } = useUI();

  // Normalize wishlist item to a shape the cart can safely store
  const toCartItem = (p) => ({
    id: p.id || p._id,
    name: p.name,
    price: p.price,
    image:
      p.image ||
      (Array.isArray(p.images) && p.images[0]) ||
      "",
    color: p.color || (Array.isArray(p.colors) && p.colors[0]) || "",
  });

  const handleAddToBag = (product) => {
    const item = toCartItem(product);
    if (!item.id) {
      showToast("Could not add to bag", "This item is missing information.");
      return;
    }
    addItem(item);
    showToast("Added to your bag", `${item.name} — wrapped with care.`);
  };

  const handleAddAll = () => {
    if (!items.length) return;

    let added = 0;
    items.forEach((p) => {
      const item = toCartItem(p);
      if (item.id) {
        addItem(item);
        added++;
      }
    });

    showToast(
      "All items added",
      `${added} piece${added !== 1 ? "s" : ""} moved to your bag.`
    );
    clear();
    closeWishlist();
    openCart();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeWishlist}
        aria-hidden="true"
        className={`fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          wishlistOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Wishlist"
        className={`fixed top-0 right-0 h-full w-full sm:w-[520px] bg-cream z-50
                    flex flex-col transition-transform duration-400 ease-out
                    ${wishlistOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 md:p-8 border-b border-sand/60">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-taupe mb-2">
              Saved with love
            </p>
            <h2 className="font-serif text-3xl md:text-4xl">
              Your wishlist{" "}
              <span className="text-charcoal/40 text-xl align-top">({count})</span>
            </h2>
          </div>
          <button
            onClick={closeWishlist}
            aria-label="Close wishlist"
            className="p-2 -m-2 hover:text-taupe transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8 text-center">
              <p className="font-serif text-2xl mb-3 text-charcoal/60">
                Nothing saved yet
              </p>
              <p className="text-sm text-charcoal/50 font-light mb-6">
                Tap the heart on any piece to keep it here.
              </p>
              <button onClick={closeWishlist} className="btn-primary">
                Continue browsing
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-sand/60">
              {items.map((item) => (
                <li key={item.id} className="p-6 md:p-8 flex gap-5 relative">
                  {/* Image */}
                  <div className="w-28 h-36 md:w-32 md:h-40 bg-sand shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex-1 min-w-0">
                    {item.tag && (
                      <p className="text-[10px] tracking-[0.25em] uppercase text-taupe mb-2">
                        {item.tag}
                      </p>
                    )}
                    <h3 className="font-serif text-xl md:text-2xl leading-tight mb-1">
                      {item.name}
                    </h3>
                    {item.color && (
                      <p className="text-xs text-charcoal/50 mb-3">{item.color}</p>
                    )}
                    <p className="font-serif text-lg mb-5">${item.price}</p>

                    <button
                      onClick={() => handleAddToBag(item)}
                      className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase
                                 pb-1 border-b border-charcoal hover:text-taupe hover:border-taupe
                                 transition-colors duration-300"
                    >
                      Add to bag <FiPlus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from wishlist`}
                    className="absolute top-6 right-6 md:top-8 md:right-8 p-1
                               text-charcoal/40 hover:text-charcoal transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sand/60 p-6 md:p-8 bg-cream">
            <button
              onClick={handleAddAll}
              className="w-full bg-charcoal text-cream py-5 text-xs tracking-widest uppercase
                         hover:bg-taupe transition-colors duration-300
                         flex items-center justify-center gap-3"
            >
              Add all to bag <FiShoppingBag className="w-4 h-4" />
            </button>
            <p className="text-center text-xs text-charcoal/50 mt-4">
              Items aren't reserved until checkout
            </p>
          </div>
        )}
      </aside>
    </>
  );
}