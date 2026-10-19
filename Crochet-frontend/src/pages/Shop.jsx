import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { productsApi } from "../lib/api";
import ProductCard from "../components/ui/ProductCard";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";

const CATEGORIES = ["All", "Bags", "Flowers", "Wearables", "Gifts"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { showToast } = useUI();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = { limit: 50 };
        if (activeCategory !== "All") params.category = activeCategory;
        
        const data = await productsApi.list(params);
        setProducts(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeCategory]);

  const handleAdd = (product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      color: product.colors?.[0] || "",
    });
    showToast("Added to your bag", `${product.name} — wrapped with care.`);
  };

  return (
    <div className="py-24 bg-cream min-h-screen">
      <div className="max-w-[1600px] mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Shop <span className="italic text-taupe">All</span></h1>
          <p className="text-charcoal/60 max-w-xl mx-auto font-light">
            Explore our full collection of handmade crochet pieces.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (cat === "All") setSearchParams({});
                else setSearchParams({ category: cat });
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
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20 text-charcoal/50">Loading collection...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-charcoal/50">No products found in this category.</div>
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