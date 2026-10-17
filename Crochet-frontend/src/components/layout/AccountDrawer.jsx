import { useState } from "react";
import { FiX, FiArrowRight } from "react-icons/fi";
import { useUI } from "../../context/UIContext";

export default function AccountDrawer() {
  const { accountOpen, closeAccount, showToast } = useUI();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire real auth later
    showToast("Signed in", "Welcome back to Loop & Bloom.");
    setEmail("");
    setPassword("");
    closeAccount();
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

      {/* Rounded panel — slides in from right */}
      <aside
        role="dialog"
        aria-label="Sign in"
        className={`fixed top-4 right-4 bottom-4 w-[calc(100%-2rem)] sm:w-[480px]
                    bg-cream z-50 rounded-3xl overflow-hidden shadow-2xl
                    flex flex-col transition-all duration-500 ease-out
                    ${accountOpen ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0"}`}
      >
        {/* Close button */}
        <button
          onClick={closeAccount}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 p-2 hover:text-taupe transition-colors"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-8 sm:px-12 py-14">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-taupe" />
            <span className="text-[11px] tracking-ultra-wide uppercase text-taupe font-medium">
              Welcome back
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] mb-6">
            Your handmade<br />
            <span className="italic text-taupe">favorites await.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-charcoal/70 font-light leading-relaxed mb-10">
            Sign in to view your orders, saved pieces, and custom requests.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[11px] tracking-ultra-wide uppercase text-taupe font-medium mb-3">
                Email address
              </label>
              <input
                id="email"
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="password" className="text-[11px] tracking-ultra-wide uppercase text-taupe font-medium">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs underline underline-offset-4 hover:text-taupe transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
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

            {/* Sign in button */}
            <button
              type="submit"
              className="w-full bg-charcoal text-cream rounded-xl py-5
                         text-xs tracking-widest uppercase
                         hover:bg-taupe transition-colors duration-300
                         flex items-center justify-center gap-3 mt-4"
            >
              Sign in <FiArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <span className="flex-1 h-px bg-sand" />
            <span className="font-serif italic text-charcoal/50">or</span>
            <span className="flex-1 h-px bg-sand" />
          </div>

          {/* Create account */}
          <p className="text-center text-sm text-charcoal/70">
            New to Loop & Bloom?{" "}
            <a
              href="/register"
              className="underline underline-offset-4 font-medium text-charcoal hover:text-taupe transition-colors"
            >
              Create an account
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}