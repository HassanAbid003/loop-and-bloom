import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { adminApi } from "../../lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const res = await adminApi.login(email, password);
      login(res.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      {/* Reduced max-width from 480px to 400px, and padding from 12 to 8 */}
      <div className="max-w-[400px] w-full bg-white p-8 shadow-xl rounded-2xl border border-sand/40">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-taupe" />
          <span className="text-[10px] tracking-ultra-wide uppercase text-taupe font-medium">
            Admin Portal
          </span>
        </div>

        {/* Reduced font size from 5xl to 3xl */}
        <h1 className="font-serif text-3xl leading-[1.1] mb-3">
          Loop & Bloom<br />
          <span className="italic text-taupe">Dashboard.</span>
        </h1>

        <p className="text-charcoal/60 text-sm font-light leading-relaxed mb-8">
          Sign in to manage orders, update products, and view performance.
        </p>

        {error && (
          <div className="bg-rose/10 text-rose-700 p-3 rounded-lg text-xs mb-4 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-ultra-wide uppercase text-taupe font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@loopandbloom.com"
              className="w-full bg-transparent border border-sand rounded-lg px-4 py-3
                         text-sm outline-none text-charcoal placeholder-charcoal/40
                         focus:border-charcoal transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-ultra-wide uppercase text-taupe font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent border border-sand rounded-lg px-4 py-3
                         text-sm outline-none text-charcoal placeholder-charcoal/40
                         focus:border-charcoal transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-charcoal text-cream rounded-lg py-3.5
                       text-xs tracking-widest uppercase
                       hover:bg-taupe transition-colors duration-300
                       flex items-center justify-center gap-2 mt-6"
          >
            Sign In <FiArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}