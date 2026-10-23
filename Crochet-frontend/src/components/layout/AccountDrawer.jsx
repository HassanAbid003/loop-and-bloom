import { useState, useEffect } from "react";
import { FiX, FiArrowRight, FiLogOut, FiPackage } from "react-icons/fi";
import { useUI } from "../../context/UIContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { authApi } from "../../lib/api";

export default function AccountDrawer() {
  const { accountOpen, closeAccount, showToast } = useUI();
  
  // REMOVED `token` from here
  const { user, login, logout, isAuthenticated } = useUserAuth();
  
  // Auth State
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Orders State
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Fetch orders when logged in and drawer opens (NO TOKEN ARGUMENT)
  useEffect(() => {
    if (isAuthenticated && accountOpen) {
      setOrdersLoading(true);
      authApi.getMyOrders()
        .then((res) => setOrders(res.orders))
        .catch((err) => console.error(err))
        .finally(() => setOrdersLoading(false));
    }
  }, [isAuthenticated, accountOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = isSignup
        ? await authApi.signup(name, email, password)
        : await authApi.login(email, password);

      // The backend now sets the cookie automatically. We just pass the user data.
      login(res.user); 
      showToast("Welcome!", `Signed in as ${res.user.name}.`);
      
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout(); // logout clears the cookie on the backend
    showToast("Signed out", "You have been logged out.");
    closeAccount();
  };

  return (
    <>
      <div
        onClick={closeAccount}
        className={`fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          accountOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        role="dialog"
        className={`fixed top-4 right-4 bottom-4 w-[calc(100%-2rem)] sm:w-[420px]
                    bg-cream z-50 rounded-3xl overflow-hidden shadow-2xl
                    flex flex-col transition-all duration-500 ease-out
                    ${accountOpen ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0"}`}
      >
        <button
          onClick={closeAccount}
          className="absolute top-5 right-5 z-10 p-2 hover:text-taupe transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 sm:px-8 py-10">
          
          {/* ========================================== */}
          {/* LOGGED IN VIEW                             */}
          {/* ========================================== */}
          {isAuthenticated ? (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-px bg-taupe" />
                  <span className="text-[10px] tracking-ultra-wide uppercase text-taupe font-medium">
                    My Account
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl leading-[1.1] mb-2">
                  Hello, <span className="italic text-taupe">{user?.name?.split(" ")[0] || "Friend"}.</span>
                </h2>
                <p className="text-charcoal/60 text-sm">{user?.email}</p>
              </div>

              <div>
                <h3 className="font-serif text-xl border-b border-sand/60 pb-3 mb-4 flex items-center gap-2">
                  <FiPackage className="w-4 h-4 text-taupe" /> Order History
                </h3>
                
                {ordersLoading ? (
                  <p className="text-sm text-charcoal/50">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <p className="text-sm text-charcoal/50">You haven't placed any orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="bg-white border border-sand/60 p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">{order.orderNumber}</p>
                            <p className="text-xs text-charcoal/50">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded-full
                            ${order.status === "paid" ? "bg-sage/10 text-sage" : ""}
                            ${order.status === "pending" ? "bg-sand text-charcoal/70" : ""}
                            ${order.status === "shipped" ? "bg-taupe/10 text-taupe" : ""}
                          `}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-sm text-charcoal/70 mb-2">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
                        </div>
                        <p className="font-medium text-right text-sm">${order.total.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-sand/60">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-transparent border border-charcoal text-charcoal py-3 rounded-lg text-xs tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-colors"
                >
                  <FiLogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            
            /* ========================================== */
            /* LOGGED OUT VIEW (Login/Signup)             */
            /* ========================================== */
            <>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-taupe" />
                <span className="text-[10px] tracking-ultra-wide uppercase text-taupe font-medium">
                  {isSignup ? "Create an account" : "Welcome back"}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl leading-[1.1] mb-4">
                Your handmade<br />
                <span className="italic text-taupe">
                  {isSignup ? "journey begins." : "favorites await."}
                </span>
              </h2>

              <p className="text-charcoal/70 text-sm font-light leading-relaxed mb-6">
                {isSignup 
                  ? "Create an account to track your orders, save your favorite pieces, and manage custom requests."
                  : "Sign in to view your orders, saved pieces, and custom requests."}
              </p>

              {error && (
                <div className="bg-rose/10 text-rose-700 p-2.5 rounded-lg text-xs mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && (
                  <div>
                    <label className="block text-[10px] tracking-ultra-wide uppercase text-taupe font-medium mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-transparent border border-sand rounded-lg px-4 py-3
                                 outline-none text-sm text-charcoal placeholder-charcoal/40 focus:border-charcoal transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] tracking-ultra-wide uppercase text-taupe font-medium mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent border border-sand rounded-lg px-4 py-3
                               outline-none text-sm text-charcoal placeholder-charcoal/40 focus:border-charcoal transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] tracking-ultra-wide uppercase text-taupe font-medium">
                      Password
                    </label>
                    {!isSignup && (
                      <a href="/forgot-password" className="text-[11px] underline underline-offset-4 text-charcoal/70 hover:text-taupe transition-colors">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent border border-sand rounded-lg px-4 py-3
                               outline-none text-sm text-charcoal placeholder-charcoal/40 focus:border-charcoal transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-charcoal text-cream rounded-lg py-3.5
                             text-xs tracking-widest uppercase
                             hover:bg-taupe transition-colors duration-300
                             flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                >
                  {loading ? "Please wait..." : isSignup ? "Create Account" : "Sign in"}
                  {!loading && <FiArrowRight className="w-3.5 h-3.5" />}
                </button>
              </form>

              <div className="flex items-center gap-4 my-6">
                <span className="flex-1 h-px bg-sand" />
                <span className="font-serif italic text-charcoal/50 text-sm">or</span>
                <span className="flex-1 h-px bg-sand" />
              </div>

              <p className="text-center text-xs text-charcoal/70">
                {isSignup ? "Already have an account?" : "New to Loop & Bloom?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setError("");
                  }}
                  className="underline underline-offset-4 font-medium text-charcoal hover:text-taupe transition-colors"
                >
                  {isSignup ? "Sign in" : "Create an account"}
                </button>
              </p>
            </>
          )}
        </div>
      </aside>
    </>
  );
}