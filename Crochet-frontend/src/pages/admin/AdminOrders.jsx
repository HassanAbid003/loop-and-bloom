import { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { adminApi } from "../../lib/api";

export default function AdminOrders() {
  const { token } = useAdminAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders on load
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getOrders(token);
      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Optimistic update (updates UI immediately)
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
      // Send to backend
      await adminApi.updateOrder(token, orderId, newStatus);
    } catch (err) {
      alert("Failed to update status: " + err.message);
      fetchOrders(); // Revert on failure
    }
  };

  if (loading) return <div className="p-8 text-charcoal/50">Loading orders...</div>;
  if (error) return <div className="p-8 text-rose">Error: {error}</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl mb-2">Orders</h1>
        <p className="text-charcoal/60 font-light">Manage and track your customer orders.</p>
      </div>

      <div className="bg-white rounded-2xl border border-sand/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-ivory/50 text-charcoal/50 text-[11px] uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/40">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-charcoal/50">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-ivory/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-charcoal/60">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-charcoal/70">{order.email}</td>
                    <td className="px-6 py-4 text-charcoal/60">
                      {order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0} items
                    </td>
                    <td className="px-6 py-4 font-medium">${order.total?.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-[11px] font-medium uppercase tracking-wider rounded-full px-3 py-1 outline-none cursor-pointer border
                          ${order.status === "paid" ? "bg-sage/10 text-sage border-sage/20" : ""}
                          ${order.status === "pending" ? "bg-sand text-charcoal/70 border-sand" : ""}
                          ${order.status === "shipped" ? "bg-taupe/10 text-taupe border-taupe/20" : ""}
                          ${order.status === "cancelled" ? "bg-rose/10 text-rose border-rose/20" : ""}
                        `}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}