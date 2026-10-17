import Icon from "./Icon";
import { useWishlist } from "../../context/WishlistContext";
import { useUI } from "../../context/UIContext";

export default function ProductCard({ product, onAdd }) {
  const { isSaved, toggle } = useWishlist();
  const { showToast } = useUI();
  const liked = isSaved(product.id);

  const handleToggle = () => {
    if (!product.id) {
      console.warn("ProductCard: product.id is missing, cannot toggle wishlist", product);
      return;
    }
    const wasSaved = liked;
    toggle(product);
    showToast(
      wasSaved ? "Removed from wishlist" : "Saved with love",
      wasSaved ? `${product.name} removed.` : `${product.name} added to your wishlist.`
    );
  };

  const handleAdd = () => {
    if (!product.id) {
      console.warn("ProductCard: product.id is missing, cannot add to cart", product);
      return;
    }
    onAdd(product);
  };

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {product.tag && (
          <span className="absolute top-4 left-4 bg-cream text-charcoal text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
            {product.tag}
          </span>
        )}

        <button
          onClick={handleToggle}
          aria-label={`${liked ? "Remove from" : "Save to"} wishlist: ${product.name}`}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            liked ? "bg-rose text-white" : "bg-cream/80 text-charcoal hover:bg-cream"
          }`}
        >
          <Icon name="heart" size={16} />
        </button>

        <button
          onClick={handleAdd}
          className="absolute bottom-4 left-4 right-4 bg-charcoal text-cream py-3 text-xs tracking-widest uppercase
                     opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                     transition-all duration-300 flex items-center justify-center gap-2"
        >
          Quick add <Icon name="plus" size={14} />
        </button>
      </div>

      <div className="pt-5 flex justify-between items-start gap-4">
        <div>
          {product.color && (
            <p className="text-[10px] tracking-[0.25em] uppercase text-taupe mb-1">
              {product.color}
            </p>
          )}
          <h3 className="font-serif text-lg leading-snug">{product.name}</h3>
        </div>
        <strong className="font-serif text-lg whitespace-nowrap">
          ${product.price}
        </strong>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <i className="w-3 h-3 rounded-full bg-rose border border-charcoal/10" />
        <i className="w-3 h-3 rounded-full bg-sage border border-charcoal/10" />
        <i className="w-3 h-3 rounded-full bg-taupe border border-charcoal/10" />
        <span className="text-[10px] text-charcoal/50 ml-1">+2</span>
      </div>
    </article>
  );
}