"use client";

import { motion } from "framer-motion";

export function EdgeCrystalsPreview({ active }: { active: boolean }) {
  // Crystals placed along the left and right edges (increased count to remove gaps)
  const crystals = Array.from({ length: 10 });

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
              rotate: (i - 2) * -15, // Fan out slightly
              filter: "drop-shadow(0 0 8px rgba(168,85,247,0.8))"
            }}
            animate={{
              scaleX: active ? [1, 2.5, 1] : [1, 1.2, 1],
              opacity: active ? [0.4, 1, 0.4] : [0.1, 0.3, 0.1],
              backgroundColor: active ? ["#ffffff", "#38bdf8", "#ffffff"] : "#475569"
            }}
            transition={{
              duration: 0.2 + Math.random() * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 0.2
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
              rotate: (i - 2) * 15,
              filter: "drop-shadow(0 0 8px rgba(56,189,248,0.8))"
            }}
            animate={{
              scaleX: active ? [1, 2.5, 1] : [1, 1.2, 1],
              opacity: active ? [0.4, 1, 0.4] : [0.1, 0.3, 0.1],
              backgroundColor: active ? ["#ffffff", "#a855f7", "#ffffff"] : "#475569"
            }}
            transition={{
              duration: 0.2 + Math.random() * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
}
