import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productsApi } from "../lib/api";
import ProductCard from "../components/ui/ProductCard";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";

const CATEGORIES = ["All", "Bags", "Flowers", "Wearables", "Gifts"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read both category and search from URL
  const activeCategory = searchParams.get("category") || "All";
  const activeSearch = searchParams.get("search") || "";
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { showToast } = useUI();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = { limit: 50 };
        
        // Send filters to the backend
        if (activeCategory !== "All") params.category = activeCategory;
        if (activeSearch) params.search = activeSearch;
        
        const data = await productsApi.list(params);
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeCategory, activeSearch]);

  const handleAdd = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.color || "",
    });
    showToast("Added to your bag", `${product.name} — wrapped with care.`);
  };

  return (
    <div className="py-24 bg-cream min-h-screen">
      <div className="max-w-[1600px] mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">
            Shop <span className="italic text-taupe">All</span>
          </h1>
          <p className="text-charcoal/60 max-w-xl mx-auto font-light">
            {activeSearch 
              ? `Showing results for "${activeSearch}"`
              : "Explore our full collection of handmade crochet pieces."}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                // Keep the search term if it exists, just change the category
                const newParams = {};
                if (cat !== "All") newParams.category = cat;
                if (activeSearch) newParams.search = activeSearch;
                setSearchParams(newParams);
              }}
              className={`px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-colors border ${
                activeCategory === cat
                  ? "bg-charcoal text-cream border-charcoal"
                  : "bg-transparent text-charcoal border-sand hover:border-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
          
          {/* Clear Search Button */}
          {activeSearch && (
            <button
              onClick={() => {
                const newParams = {};
                if (activeCategory !== "All") newParams.category = activeCategory;
                setSearchParams(newParams);
              }}
              className="px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-colors border border-rose text-rose hover:bg-rose hover:text-white"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20 text-charcoal/50">Loading collection...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-charcoal/50">
            No products found {activeSearch ? `for "${activeSearch}"` : "in this category"}.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0],
                  tag: product.tags?.[0] || "",
                  color: product.colors?.[0] || "",
                  stock: product.stock,
                  isHidden: product.isHidden,
                }}
                onAdd={handleAdd}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}