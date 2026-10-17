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

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        </Routes>
      </main>
      <Footer />

      {/* Overlays */}
      <CartDrawer />
      <WishlistDrawer />
      <AccountDrawer />
      <MobileMenu />
      <SearchOverlay />
      <Toast />
    </div>
  );
}

export default App;