"use client";

import { motion } from "framer-motion";

export function SideBarsPreview({ active }: { active: boolean }) {
  // 12 bars on each side for higher fidelity
  const bars = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-between">
      {/* Left Equalizer */}
      <div className="flex flex-col justify-center gap-1.5 h-full w-24 py-8">
        {bars.map((_, i) => {
          // Create a curved EQ shape (longer in the middle)
          const distanceFromCenter = Math.abs(i - 5.5);
          const baseWidth = Math.max(5, 20 - distanceFromCenter * 3);
          
          return (
            <motion.div
              key={`l-${i}`}
              animate={{
                width: active 
                  ? [`${baseWidth}px`, `${baseWidth + Math.random() * 30}px`, `${baseWidth}px`] 
                  : `${baseWidth}px`,
                opacity: active ? [0.4, 1, 0.4] : 0.2
              }}
              transition={{
                duration: 0.1 + Math.random() * 0.2,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="h-[3px] rounded-r-full bg-gradient-to-r from-accent to-purple-400 shadow-[0_0_10px_rgba(56,189,248,0.5)] origin-left"
            />
          );
        })}
      </div>

      {/* Right Equalizer */}
      <div className="flex flex-col justify-center items-end gap-1.5 h-full w-24 py-8">
        {bars.map((_, i) => {
          const distanceFromCenter = Math.abs(i - 5.5);
          const baseWidth = Math.max(5, 20 - distanceFromCenter * 3);
          
          return (
            <motion.div
              key={`r-${i}`}
              animate={{
                width: active 
                  ? [`${baseWidth}px`, `${baseWidth + Math.random() * 30}px`, `${baseWidth}px`] 
                  : `${baseWidth}px`,
                opacity: active ? [0.4, 1, 0.4] : 0.2
              }}
              transition={{
                duration: 0.1 + Math.random() * 0.2,
                repeat: Infinity,
                ease: "easeOut",
                delay: Math.random() * 0.1
              }}
              className="h-[3px] rounded-l-full bg-gradient-to-l from-accent to-purple-400 shadow-[0_0_10px_rgba(56,189,248,0.5)] origin-right"
            />
          );
        })}
      </div>
    </div>
  );
}
