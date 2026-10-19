

import { useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ui/ProductCard";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";
import Icon from "../ui/Icon";
import { useCart } from "../../context/CartContext";
import { useUI } from "../../context/UIContext";
import { useProducts } from "../../hooks/useProducts";
import { useReveal } from "../../hooks/useReveal";

// Fallback image if a product has no images in the DB
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1668072587819-7b393944b426?auto=format&fit=crop&w=900&q=85";

// Safely pick the first image or return the fallback
function pickImage(images) {
  return Array.isArray(images) && images.length > 0 && images[0]
    ? images[0]
    : FALLBACK_IMAGE;
}

export default function NewArrivals() {
  const { addItem } = useCart();
  const { showToast } = useUI();
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  // Fetch featured products from the backend API
  const { data, loading, error } = useProducts({ featured: "true", limit: 4 });
  const products = data?.products || [];

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
    <section ref={sectionRef} id="shop" className="py-24 md:py-16 bg-cream">
      <div className="max-w-[1300px] mx-auto px-8">
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-taupe" />
            <span className="section-eyebrow">Fresh from the hook</span>
            <span className="w-12 h-px bg-taupe" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-4">
            New <span className="italic text-taupe">Arrivals</span>
          </h2>
          <p className="text-charcoal/60 max-w-xl mx-auto font-light">
            Small-batch pieces, just finished and ready to find their home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Loading */}
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}

          {/* Error */}
          {!loading && error && (
            <div className="col-span-full text-center py-12">
              <p className="text-charcoal/60 font-light mb-3">
                We couldn't load new arrivals right now.
              </p>
              <p className="text-xs text-charcoal/40">{error}</p>
            </div>
          )}

          {/* Data */}
          {!loading &&
            !error &&
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: pickImage(product.images),
                  tag: product.tags?.[0] || "",
                  color: product.colors?.[0] || "",
                  stock: product.stock, 
                }}
                onAdd={handleAdd}
              />
            ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 text-xs tracking-widest uppercase
                       border border-charcoal px-8 py-4 hover:bg-charcoal hover:text-cream
                       transition-colors duration-300"
          >
            View all new arrivals <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}