"use client";

import { motion } from "framer-motion";

export function RippleFlowPreview({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[#060913]/90 z-0" />
      
      {/* Left Ripples */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-full flex items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`l-${i}`}
            className="absolute left-0 w-[2px] bg-cyan-400 rounded-full"
            animate={{
              height: active ? ["20%", "80%", "20%"] : "20%",
              opacity: active ? [0.8, 0, 0] : 0.2,
              x: active ? [0, 20, 20] : 0
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.5
            }}
            style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.8))" }}
          />
        ))}
      </div>

      {/* Right Ripples */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-full flex items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`r-${i}`}
            className="absolute right-0 w-[2px] bg-cyan-400 rounded-full"
            animate={{
              height: active ? ["20%", "80%", "20%"] : "20%",
              opacity: active ? [0.8, 0, 0] : 0.2,
              x: active ? [0, -20, -20] : 0
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.5
            }}
            style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.8))" }}
          />
        ))}
      </div>
    </div>
  );
}
