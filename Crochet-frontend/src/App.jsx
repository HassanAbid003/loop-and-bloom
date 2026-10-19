import { Routes, Route } from "react-router-dom";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SearchOverlay from "./components/layout/SearchOverlay";
import CartDrawer from "./components/layout/CartDrawer";
import WishlistDrawer from "./components/layout/WishlistDrawer";
import AccountDrawer from "./components/layout/AccountDrawer";
import MobileMenu from "./components/layout/MobileMenu";
import Toast from "./components/layout/Toast";

import Home from "./pages/Home";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminSettings from "./pages/admin/AdminSettings";

import Shop from "./pages/Shop";
import About from "./pages/About";

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <AccountDrawer />
      <MobileMenu />
      <SearchOverlay />
      <Toast />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Public Routes */}
      <Route
        path="/*"
        element={
          <PublicLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          </Routes>
          </PublicLayout>
        }
      />
    </Routes>
  );
}

export default App;