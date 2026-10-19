import { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { adminApi } from "../../lib/api";

export default function AdminProducts() {
  const { token } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Form State
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", price: "", category: "Bags", description: "", stock: 10, images: [""]
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getProducts(token);
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  // Handle Image Upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await adminApi.uploadImage(token, file);
      setFormData({ ...formData, images: [imageUrl] });
    } catch (err) {
      alert("Failed to upload image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        status: "active",
        featured: true
      };
      await adminApi.createProduct(token, newProduct);
      
      // Reset form
      setIsAdding(false);
      setFormData({ name: "", price: "", category: "Bags", description: "", stock: 10, images: [""] });
      fetchProducts();
    } catch (err) {
      alert("Failed to create product: " + err.message);
    }
  };

  const handleArchive = async (id) => {
    if (!window.confirm("Are you sure you want to archive this product?")) return;
    try {
      await adminApi.deleteProduct(token, id);
      fetchProducts();
    } catch (err) {
      alert("Failed to archive: " + err.message);
    }
  };

  if (loading) return <div className="p-8 text-charcoal/50">Loading products...</div>;
  if (error) return <div className="p-8 text-rose">Error: {error}</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl mb-2">Products</h1>
          <p className="text-charcoal/60 font-light">Manage your store's inventory.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-charcoal text-cream px-6 py-3 rounded-lg text-xs tracking-widest uppercase hover:bg-taupe transition-colors"
        >
          {isAdding ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl border border-sand/60 shadow-sm space-y-4">
          <h2 className="font-serif text-2xl mb-4">New Product</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="Product Name" className="border border-sand p-3 rounded-lg" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="number" placeholder="Price ($)" className="border border-sand p-3 rounded-lg" 
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            <select className="border border-sand p-3 rounded-lg" 
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Bags">Bags</option>
              <option value="Flowers">Flowers</option>
              <option value="Wearables">Wearables</option>
              <option value="Gifts">Gifts</option>
            </select>
            <input required type="number" placeholder="Stock Quantity" className="border border-sand p-3 rounded-lg" 
              value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
          </div>

          {/* Image Upload Input */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-charcoal/70 mb-2">Product Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-sand p-3 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-charcoal file:text-cream hover:file:bg-taupe cursor-pointer"
            />
            {uploading && <p className="text-xs text-taupe mt-2 animate-pulse">Uploading image to Cloudinary...</p>}
            
            {/* Image Preview */}
            {formData.images[0] && (
              <div className="mt-4 flex items-center gap-4">
                <img src={formData.images[0]} alt="Preview" className="h-20 w-16 object-cover rounded shadow-sm border border-sand" />
                <span className="text-xs text-sage font-medium">Image uploaded successfully!</span>
              </div>
            )}
          </div>

          <textarea required placeholder="Description" rows="3" className="w-full border border-sand p-3 rounded-lg" 
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          
          <button 
            type="submit" 
            disabled={uploading || !formData.images[0]} 
            className="bg-charcoal text-cream px-8 py-3 rounded-lg text-xs tracking-widest uppercase hover:bg-taupe transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Product
          </button>
        </form>
      )}

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-sand/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-ivory/50 text-charcoal/50 text-[11px] uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/40">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img src={product.images?.[0]} alt="" className="w-10 h-12 object-cover rounded bg-sand" />
                    <span className="font-medium">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 text-charcoal/60">{product.category}</td>
                  <td className="px-6 py-4 font-medium">${product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                      ${product.status === "active" ? "bg-sage/10 text-sage" : "bg-sand text-charcoal/50"}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleArchive(product._id)} className="text-xs text-rose hover:underline">
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}