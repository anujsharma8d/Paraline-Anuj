"use client";

import { motion } from "framer-motion";

export function ReactiveBorderPreview({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#060913]/90 z-0" />

      <svg className="absolute top-[2px] left-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] pointer-events-none z-10" preserveAspectRatio="none">
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="10"
          fill="none"
          stroke="url(#reactive-gradient)"
          strokeWidth="2"
          animate={{
            opacity: active ? [0.4, 1, 0.4] : [0.1, 0.3, 0.1],
            strokeWidth: active ? [2, 4, 2] : 1
          }}
          transition={{
            duration: active ? 0.4 : 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
          }}
          style={{
            filter: "drop-shadow(0 0 10px rgba(56,189,248,0.6))"
          }}
        />
        <defs>
          <linearGradient id="reactive-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
