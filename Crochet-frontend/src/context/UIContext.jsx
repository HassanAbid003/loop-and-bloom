import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const closeAll = () => {
    setCartOpen(false);
    setMenuOpen(false);
    setSearchOpen(false);
    setWishlistOpen(false);
    setAccountOpen(false);
  };

  const openCart = () => { closeAll(); setCartOpen(true); };
  const closeCart = () => setCartOpen(false);

  const openMenu = () => { closeAll(); setMenuOpen(true); };
  const closeMenu = () => setMenuOpen(false);

  const openSearch = () => { closeAll(); setSearchOpen(true); };
  const closeSearch = () => setSearchOpen(false);

  const openWishlist = () => { closeAll(); setWishlistOpen(true); };
  const closeWishlist = () => setWishlistOpen(false);

  const openAccount = () => { closeAll(); setAccountOpen(true); };
  const closeAccount = () => setAccountOpen(false);

  const showToast = (title, message) => {
    setToast({ title, message });
    window.setTimeout(() => setToast(null), 3000);
  };

  return (
    <UIContext.Provider
      value={{
        cartOpen, openCart, closeCart,
        menuOpen, openMenu, closeMenu,
        searchOpen, openSearch, closeSearch,
        wishlistOpen, openWishlist, closeWishlist,
        accountOpen, openAccount, closeAccount,
        toast, showToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}