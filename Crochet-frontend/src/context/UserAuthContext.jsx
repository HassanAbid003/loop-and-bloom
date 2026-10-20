import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../lib/api";

const UserAuthContext = createContext(null);
const STORAGE_KEY = "loop-and-bloom-user-token";

export function UserAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On load, if we have a token, fetch the user profile
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await authApi.getMe(token);
        setUser(res.user);
      } catch (err) {
        console.error("Failed to load user", err);
        // Token is invalid/expired — clear it
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem(STORAGE_KEY, newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <UserAuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
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