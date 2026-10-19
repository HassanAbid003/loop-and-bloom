import { FiDollarSign, FiShoppingBag, FiBox } from "react-icons/fi";

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
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
            <p className="font-serif text-3xl">$68.00</p>
            <p className="text-xs text-sage mt-2 font-medium">+100% from last month</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center text-rose">
            <FiDollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-sand/60 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-2">Orders</p>
            <p className="font-serif text-3xl">1</p>
            <p className="text-xs text-charcoal/40 mt-2">Awaiting fulfillment</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-taupe/10 flex items-center justify-center text-taupe">
            <FiShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-sand/60 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal/50 mb-2">Active Products</p>
            <p className="font-serif text-3xl">4</p>
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
          <button className="text-xs tracking-widest uppercase text-taupe hover:text-charcoal transition-colors">
            View All
          </button>
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
              <tr className="hover:bg-ivory/30 transition-colors">
                <td className="px-6 py-4 font-medium">LB-2026-0001</td>
                <td className="px-6 py-4 text-charcoal/70">test@example.com</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-rose/10 text-rose uppercase tracking-wider">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4">$68.00</td>
                <td className="px-6 py-4 text-charcoal/50">Today</td>
              </tr>
              {/* Placeholder row for visual effect */}
              <tr className="hover:bg-ivory/30 transition-colors opacity-50">
                <td className="px-6 py-4 font-medium">LB-2026-0000</td>
                <td className="px-6 py-4 text-charcoal/70">jane@example.com</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-sand text-charcoal/60 uppercase tracking-wider">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">$128.00</td>
                <td className="px-6 py-4 text-charcoal/50">Yesterday</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}