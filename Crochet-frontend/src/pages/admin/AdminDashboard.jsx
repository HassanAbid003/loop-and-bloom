import { useEffect, useState } from "react";
import { FiDollarSign, FiShoppingBag, FiBox } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { adminApi } from "../../lib/api";

export default function AdminDashboard() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState({
    revenue: 0,
    ordersCount: 0,
    productsCount: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [ordersData, productsData] = await Promise.all([
          adminApi.getOrders(token),
          adminApi.getProducts(token),
        ]);

        // Calculate real revenue (only count 'paid' or 'delivered' orders)
        const validOrders = ordersData.orders.filter(
          (o) => o.status === "paid" || o.status === "shipped" || o.status === "delivered"
        );
        const totalRevenue = validOrders.reduce((sum, order) => sum + order.total, 0);

        // Count active products
        const activeProducts = productsData.products.filter(
          (p) => p.status === "active"
        ).length;

        setStats({
          revenue: totalRevenue,
          ordersCount: ordersData.orders.length,
          productsCount: activeProducts,
          recentOrders: ordersData.orders.slice(0, 5), // Get latest 5
        });
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, [token]);

  if (loading) return <div className="p-8 text-charcoal/50">Loading dashboard data...</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-4xl mb-2">Dashboard</h1>
        <p className="text-charcoal/60 font-light">Welcome back. Here is what's happening at Loop & Bloom today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-sand/60 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-2">Total Revenue</p>
            <p className="font-serif text-3xl">${stats.revenue.toFixed(2)}</p>
            <p className="text-xs text-sage mt-2 font-medium">From paid orders</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center text-rose">
            <FiDollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-sand/60 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-2">Total Orders</p>
            <p className="font-serif text-3xl">{stats.ordersCount}</p>
            <p className="text-xs text-charcoal/40 mt-2">All time</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-taupe/10 flex items-center justify-center text-taupe">
            <FiShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-sand/60 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-2">Active Products</p>
            <p className="font-serif text-3xl">{stats.productsCount}</p>
            <p className="text-xs text-charcoal/40 mt-2">In your catalog</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage">
            <FiBox className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-sand/60 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-sand/60 flex items-center justify-between">
          <h2 className="font-serif text-2xl">Recent Orders</h2>
          <Link to="/admin/orders" className="text-xs tracking-widest uppercase text-taupe hover:text-charcoal transition-colors">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-ivory/50 text-charcoal/50 text-[11px] uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/40">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-charcoal/50">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-ivory/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-charcoal/70">{order.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                        ${order.status === "paid" ? "bg-sage/10 text-sage" : ""}
                        ${order.status === "pending" ? "bg-sand text-charcoal/70" : ""}
                        ${order.status === "shipped" ? "bg-taupe/10 text-taupe" : ""}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-charcoal/50">
                      {new Date(order.createdAt).toLocaleDateString()}
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