import { HTMLAttributes, useId } from "react";

export function Logo({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  const baseId = useId().replace(/:/g, "");
  const sweep1Id = `sweep-1-${baseId}`;
  const sweep2Id = `sweep-2-${baseId}`;
  const sweep3Id = `sweep-3-${baseId}`;

  return (
    <div className={`flex items-center gap-3.5 group cursor-pointer ${className}`} {...props}>
      <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),_0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] group-hover:scale-105">
        
        {/* Subtle ambient pulse behind logo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
        
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-700"
        >
          {/* 3 Abstract Audio Wave / Motion Sweeps */}
          <path 
            d="M3 14C3 14 7.5 4 16 4C21 4 21 8 21 8" 
            stroke={`url(#${sweep1Id})`} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            className="group-hover:translate-x-[1px] transition-transform duration-500 delay-75"
          />
          <path 
            d="M3 18C3 18 7.5 8 16 8C21 8 21 12 21 12" 
            stroke={`url(#${sweep2Id})`} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            className="group-hover:translate-x-[2px] transition-transform duration-500 delay-150"
          />
          <path 
            d="M3 22C3 22 7.5 12 16 12C21 12 21 16 21 16" 
            stroke={`url(#${sweep3Id})`} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            className="group-hover:translate-x-[3px] transition-transform duration-500 delay-200"
          />

          <defs>
            <linearGradient id={sweep1Id} x1="3" y1="14" x2="21" y2="4" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#c084fc" />
            </linearGradient>
            <linearGradient id={sweep2Id} x1="3" y1="18" x2="21" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id={sweep3Id} x1="3" y1="22" x2="21" y2="12" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818cf8" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-[26px] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 group-hover:to-cyan-200 transition-colors duration-500 drop-shadow-md">
        Paraline
      </span>
    </div>
  );
}
