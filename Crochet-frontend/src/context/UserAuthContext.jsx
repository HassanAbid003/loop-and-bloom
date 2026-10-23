import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../lib/api";

const UserAuthContext = createContext(null);

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, ask the backend if we are logged in (via the cookie)
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await authApi.getMe();
        setUser(res.user);
      } catch (err) {
        // Not logged in, no problem
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error(err);
    }
    setUser(null);
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error("useUserAuth must be used inside <UserAuthProvider>");
  return ctx;
}