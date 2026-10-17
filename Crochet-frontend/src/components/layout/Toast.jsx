import { FiCheck } from "react-icons/fi";
import { useUI } from "../../context/UIContext";

export default function Toast() {
  const { toast } = useUI();

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]
                  bg-charcoal text-cream px-5 py-4 shadow-2xl
                  flex items-center gap-4 transition-all duration-300
                  ${toast ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}`}
    >
      <span className="w-8 h-8 rounded-full bg-rose flex items-center justify-center shrink-0">
        <FiCheck className="w-4 h-4" />
      </span>
      <div>
        <div className="text-sm font-medium">{toast?.title || "Added to your bag"}</div>
        <div className="text-xs text-cream/60 mt-0.5">
          {toast?.message || "Wrapped with care, just for you."}
        </div>
      </div>
    </div>
  );
}