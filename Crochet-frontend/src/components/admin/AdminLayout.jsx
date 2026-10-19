import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiGrid, FiShoppingBag, FiBox, FiSettings, FiLogOut, FiExternalLink } from "react-icons/fi";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FiGrid },
    { name: "Orders", path: "/admin/orders", icon: FiShoppingBag },
    { name: "Products", path: "/admin/products", icon: FiBox },
    { name: "Settings", path: "/admin/settings", icon: FiSettings }, // ✅ Added here
  ];

  return (
    <div className="min-h-screen flex bg-cream text-charcoal">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-cream flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 border-b border-cream/10">
          <h2 className="font-serif text-2xl tracking-wide">LOOP <span className="italic text-rose">&</span> BLOOM</h2>
          <p className="text-[10px] tracking-[0.3em] uppercase text-cream/50 mt-2">Admin Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                  isActive 
                    ? "bg-cream/10 text-rose font-medium" 
                    : "hover:bg-cream/5 text-cream/60 hover:text-cream"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-cream/10 space-y-2">
          <a 
            href="/" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-cream/60 hover:bg-cream/5 hover:text-cream transition-colors"
          >
            <FiExternalLink className="w-4 h-4" />
            View Store
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-cream/60 hover:bg-rose/20 hover:text-rose transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 lg:p-12 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}