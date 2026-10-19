import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UIProvider } from "./context/UIContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx"; // Add this
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UIProvider>
        <CartProvider>
          <WishlistProvider>
            <AdminAuthProvider> {/* Wrap App here */}
              <App />
            </AdminAuthProvider>
          </WishlistProvider>
        </CartProvider>
      </UIProvider>
    </BrowserRouter>
  </React.StrictMode>
);