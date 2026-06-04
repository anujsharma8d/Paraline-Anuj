"use client";

import { motion } from "framer-motion";

export function EdgeCrystalsPreview({ active }: { active: boolean }) {
  // Crystals placed along the left and right edges (increased count to remove gaps)
  const crystals = Array.from({ length: 10 });
  const midpoint = (crystals.length - 1) / 2;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#060913]/90 z-0" />

      {/* Left Crystals */}
      <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-evenly py-4">
        {crystals.map((_, i) => (
          <motion.div
            key={`l-${i}`}
            className="h-1 w-6 bg-white rounded-r-md origin-left"
            style={{
              rotate: (i - midpoint) * -15, // Fan out symmetrically from center
              filter: "drop-shadow(0 0 8px rgba(168,85,247,0.8))"
            }}
            animate={{
              scaleX: active ? [1, 1.5, 1] : [1, 1.1, 1],
              opacity: active ? [0.3, 0.6, 0.3] : [0.1, 0.2, 0.1],
              backgroundColor: active ? ["#ffffff", "#38bdf8", "#ffffff"] : "#475569"
            }}
            transition={{
              duration: 2.0 + Math.random() * 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 0.5
            }}
          />
        ))}
      </div>

      {/* Right Crystals */}
      <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col items-end justify-evenly py-4">
        {crystals.map((_, i) => (
          <motion.div
            key={`r-${i}`}
            className="h-1 w-6 bg-white rounded-l-md origin-right"
            style={{
              rotate: (i - midpoint) * 15, // Fan out symmetrically from center
              filter: "drop-shadow(0 0 8px rgba(56,189,248,0.8))"
            }}
            animate={{
              scaleX: active ? [1, 1.5, 1] : [1, 1.1, 1],
              opacity: active ? [0.3, 0.6, 0.3] : [0.1, 0.2, 0.1],
              backgroundColor: active ? ["#ffffff", "#a855f7", "#ffffff"] : "#475569"
            }}
            transition={{
              duration: 2.0 + Math.random() * 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
}
