import { useState } from "react";
import PreviewStage from "./PreviewStage";

export default function ThemeCard({
  theme,
  compareSelected = false,
  onCompareToggle,
  compareDisabled = false,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <label
        className={`absolute top-3 right-3 z-20 flex items-center gap-1.5 cursor-pointer select-none transition-opacity duration-200 ${hovered || compareSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"} ${compareDisabled ? "cursor-not-allowed" : ""}`}
        title={compareDisabled ? "Remove a theme to add another" : compareSelected ? "Remove from comparison" : "Add to comparison"}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={compareSelected}
          disabled={compareDisabled}
          onChange={() => !compareDisabled && onCompareToggle?.(theme)}
        />
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border transition-all duration-200 ${compareSelected ? "bg-violet-500/90 border-violet-400 text-white" : compareDisabled ? "bg-white/5 border-white/10 text-white/30" : "bg-black/40 border-white/20 text-white/70 hover:border-violet-400/60 hover:text-white"}`}
        >
          {compareSelected ? (
            <>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Comparing
            </>
          ) : (
            <>+ Compare</>
          )}
        </span>
      </label>

      <PreviewStage theme={theme} />

      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-tight">{theme.name}</h3>
        <p className="text-white/40 text-xs mt-0.5">{theme.tag}</p>
        <p className="text-white/60 text-xs mt-2 leading-relaxed">{theme.blurb}</p>
      </div>
    </div>
  );
}
