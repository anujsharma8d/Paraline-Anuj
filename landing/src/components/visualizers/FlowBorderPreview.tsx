"use client";

import { motion } from "framer-motion";

export function FlowBorderPreview({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Dimming */}
      <div className="absolute inset-0 bg-[#060913]/90 z-0" />

      {/* SVG Trace */}
      <svg className="absolute top-[2px] left-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] pointer-events-none z-10" preserveAspectRatio="none">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="10"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
        />
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="10"
          fill="none"
          stroke="url(#flow-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ strokeDasharray: "20% 100%", strokeDashoffset: "100%" }}
          animate={{
            strokeDashoffset: ["100%", "-20%"]
          }}
          transition={{
            duration: active ? 2 : 6,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            filter: "drop-shadow(0 0 12px rgba(168,85,247,0.8)) drop-shadow(0 0 4px rgba(56,189,248,1))",
          }}
        />
        <defs>
          <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#a855f7" /> {/* Purple */}
            <stop offset="100%" stopColor="#38bdf8" /> {/* Cyan */}
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
