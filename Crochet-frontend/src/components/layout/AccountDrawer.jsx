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
      <div
        onClick={closeAccount}
        aria-hidden="true"
        className={`fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          accountOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        role="dialog"
        aria-label={isSignup ? "Sign up" : "Sign in"}
        className={`fixed top-4 right-4 bottom-4 w-[calc(100%-2rem)] sm:w-[420px]
                    bg-cream z-50 rounded-3xl overflow-hidden shadow-2xl
                    flex flex-col transition-all duration-500 ease-out
                    ${accountOpen ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0"}`}
      >
        <button
          onClick={closeAccount}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 p-2 hover:text-taupe transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* REDUCED PADDING HERE: px-6, py-10 */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 sm:px-8 py-10">
          
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-taupe" />
            <span className="text-[10px] tracking-ultra-wide uppercase text-taupe font-medium">
              {isSignup ? "Create an account" : "Welcome back"}
            </span>
          </div>

          {/* REDUCED TEXT SIZE: text-3xl */}
          <h2 className="font-serif text-3xl sm:text-4xl leading-[1.1] mb-4">
            Your handmade<br />
            <span className="italic text-taupe">
              {isSignup ? "journey begins." : "favorites await."}
            </span>
          </h2>

          {/* REDUCED TEXT SIZE & MARGIN */}
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
                             outline-none text-sm text-charcoal placeholder-charcoal/40
                             focus:border-charcoal transition-colors"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-[10px] tracking-ultra-wide uppercase text-taupe font-medium mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent border border-sand rounded-lg px-4 py-3
                           outline-none text-sm text-charcoal placeholder-charcoal/40
                           focus:border-charcoal transition-colors"
              />
            </div>

            <div>
              {/* FIXED SPACING AND ALIGNMENT FOR LABEL AND FORGOT PASSWORD */}
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-[10px] tracking-ultra-wide uppercase text-taupe font-medium">
                  Password
                </label>
                {!isSignup && (
                  <a
                    href="/forgot-password"
                    className="text-[11px] underline underline-offset-4 text-charcoal/70 hover:text-taupe transition-colors"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border border-sand rounded-lg px-4 py-3
                           outline-none text-sm text-charcoal placeholder-charcoal/40
                           focus:border-charcoal transition-colors"
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
        </div>
      </aside>
    </>
  );
}