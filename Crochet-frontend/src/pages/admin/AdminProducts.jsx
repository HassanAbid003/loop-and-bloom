import { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { adminApi } from "../../lib/api";
import { FiEdit2, FiTrash2, FiEye, FiEyeOff, FiPlus } from "react-icons/fi";

const INITIAL_FORM = {
  name: "", price: "", category: "Bags", description: "", stock: 10, images: [""], status: "active"
};

export default function AdminProducts() {
  const { token } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

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

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(INITIAL_FORM);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      stock: product.stock,
      images: product.images?.length ? product.images : [""],
      status: product.status,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      if (editingId) {
        await adminApi.updateProduct(token, editingId, payload);
      } else {
        await adminApi.createProduct(token, { ...payload, featured: true });
      }
      setIsFormOpen(false);
      fetchProducts();
    } catch (err) {
      alert("Failed to save product: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("PERMANENTLY delete this product? This cannot be undone.")) return;
    try {
      await adminApi.deleteProductPermanently(token, id);
      fetchProducts();
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await adminApi.toggleProductStatus(token, id);
      fetchProducts();
    } catch (err) {
      alert("Failed to toggle status: " + err.message);
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
          onClick={isFormOpen ? () => setIsFormOpen(false) : handleOpenCreate}
          className="bg-charcoal text-cream px-6 py-3 rounded-lg text-xs tracking-widest uppercase hover:bg-taupe transition-colors flex items-center gap-2"
        >
          {isFormOpen ? "Cancel" : <><FiPlus /> Add Product</>}
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-sand/60 shadow-sm space-y-4">
          <h2 className="font-serif text-2xl mb-4">{editingId ? "Edit Product" : "New Product"}</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="Product Name" className="border border-sand p-3 rounded-lg" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="number" step="0.01" placeholder="Price ($)" className="border border-sand p-3 rounded-lg" 
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

          <div>
            <label className="block text-xs uppercase tracking-widest text-charcoal/70 mb-2">Product Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-sand p-3 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-charcoal file:text-cream hover:file:bg-taupe cursor-pointer"
            />
            {uploading && <p className="text-xs text-taupe mt-2 animate-pulse">Uploading...</p>}
            {formData.images[0] && (
              <img src={formData.images[0]} alt="Preview" className="mt-4 h-20 w-16 object-cover rounded shadow-sm border border-sand" />
            )}
          </div>

          <textarea required placeholder="Description" rows="3" className="w-full border border-sand p-3 rounded-lg" 
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          
          <button 
            type="submit" 
            disabled={uploading || !formData.images[0]} 
            className="bg-charcoal text-cream px-8 py-3 rounded-lg text-xs tracking-widest uppercase hover:bg-taupe transition-colors disabled:opacity-50"
          >
            {editingId ? "Update Product" : "Save Product"}
          </button>
        </form>
      )}

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
                <tr key={product._id} className={`hover:bg-ivory/30 transition-colors ${product.isHidden ? 'opacity-60' : ''}`}>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img src={product.images?.[0]} alt="" className="w-10 h-12 object-cover rounded bg-sand" />
                    <span className="font-medium">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 text-charcoal/60">{product.category}</td>
                  <td className="px-6 py-4 font-medium">${product.price}</td>
                  
                  <td className="px-6 py-4">
                    {product.stock <= 0 ? (
                      <span className="text-rose font-medium text-xs uppercase tracking-wider">Out of stock</span>
                    ) : (
                      product.stock
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                      ${!product.isHidden ? "bg-sage/10 text-sage" : "bg-sand text-charcoal/50"}`}>
                      {!product.isHidden ? "Active" : "Hidden"}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                    <button onClick={() => handleOpenEdit(product)} className="text-charcoal/50 hover:text-charcoal transition-colors" title="Edit">
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => handleToggleStatus(product._id)} 
                      className={`transition-colors ${!product.isHidden ? "text-sage hover:text-sage/70" : "text-charcoal/40 hover:text-charcoal"}`} 
                      title={!product.isHidden ? "Visible on site (click to hide)" : "Hidden from site (click to show)"}
                    >
                      {!product.isHidden ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                    </button>

                    <button onClick={() => handleDelete(product._id)} className="text-charcoal/50 hover:text-rose transition-colors" title="Delete Permanently">
                      <FiTrash2 className="w-4 h-4" />
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