import { useState } from "react";
import { FiX, FiArrowRight } from "react-icons/fi";
import { useUI } from "../../context/UIContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { authApi } from "../../lib/api";

export default function AccountDrawer() {
  const { accountOpen, closeAccount, showToast } = useUI();
  const { login } = useUserAuth();
  
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = isSignup
        ? await authApi.signup(name, email, password)
        : await authApi.login(email, password);

      login(res.token, res.user);
      showToast("Welcome!", `Signed in as ${res.user.name}.`);
      
      // Reset form and close drawer
      setName("");
      setEmail("");
      setPassword("");
      closeAccount();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeAccount}
        aria-hidden="true"
        className={`fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          accountOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label={isSignup ? "Sign up" : "Sign in"}
        className={`fixed top-4 right-4 bottom-4 w-[calc(100%-2rem)] sm:w-[480px]
                    bg-cream z-50 rounded-3xl overflow-hidden shadow-2xl
                    flex flex-col transition-all duration-500 ease-out
                    ${accountOpen ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0"}`}
      >
        <button
          onClick={closeAccount}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 p-2 hover:text-taupe transition-colors"
        >
          <FiX className="w-6 h-6" />
        </button>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-8 sm:px-12 py-14">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-taupe" />
            <span className="text-[11px] tracking-ultra-wide uppercase text-taupe font-medium">
              {isSignup ? "Create an account" : "Welcome back"}
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] mb-6">
            Your handmade<br />
            <span className="italic text-taupe">
              {isSignup ? "journey begins." : "favorites await."}
            </span>
          </h2>

          <p className="text-charcoal/70 font-light leading-relaxed mb-8">
            {isSignup 
              ? "Create an account to track your orders, save your favorite pieces, and manage custom requests."
              : "Sign in to view your orders, saved pieces, and custom requests."}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-rose/10 text-rose-700 p-3 rounded-xl text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div>
                <label className="block text-[11px] tracking-ultra-wide uppercase text-taupe font-medium mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-transparent border border-sand rounded-xl px-5 py-4
                             outline-none text-charcoal placeholder-charcoal/40
                             focus:border-charcoal transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] tracking-ultra-wide uppercase text-taupe font-medium mb-3">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent border border-sand rounded-xl px-5 py-4
                           outline-none text-charcoal placeholder-charcoal/40
                           focus:border-charcoal transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[11px] tracking-ultra-wide uppercase text-taupe font-medium">
                  Password
                </label>
                {!isSignup && (
                  <a
                    href="/forgot-password"
                    className="text-xs underline underline-offset-4 hover:text-taupe transition-colors"
                  >
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
                className="w-full bg-transparent border border-sand rounded-xl px-5 py-4
                           outline-none text-charcoal placeholder-charcoal/40
                           focus:border-charcoal transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-charcoal text-cream rounded-xl py-5
                         text-xs tracking-widest uppercase
                         hover:bg-taupe transition-colors duration-300
                         flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
            >
              {loading ? "Please wait..." : isSignup ? "Create Account" : "Sign In"}
              {!loading && <FiArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <span className="flex-1 h-px bg-sand" />
            <span className="font-serif italic text-charcoal/50">or</span>
            <span className="flex-1 h-px bg-sand" />
          </div>

          <p className="text-center text-sm text-charcoal/70">
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
        </div>
      </aside>
    </>
  );
}