"use client";

import { motion } from "framer-motion";
import { useId } from "react";

export function AuroraDriftPreview({ active }: { active: boolean }) {
  const instanceId = useId().replace(/:/g, "");
  // We'll create several layered SVG paths that drift horizontally
  // and scale vertically to simulate highly-reactive aurora curtains.
  const curtains = [
    { color: "text-purple-500", opacity: active ? 0.8 : 0.3, duration: 8, delay: 0, scale: active ? [1, 1.5, 1] : [1, 1.1, 1] },
    { color: "text-cyan-400", opacity: active ? 0.9 : 0.4, duration: 12, delay: -2, scale: active ? [1, 1.8, 1] : [1, 1.05, 1] },
    { color: "text-emerald-400", opacity: active ? 0.6 : 0.2, duration: 10, delay: -5, scale: active ? [1, 1.3, 1] : [1, 1.15, 1] },
    { color: "text-indigo-500", opacity: active ? 0.7 : 0.3, duration: 15, delay: -7, scale: active ? [1, 1.6, 1] : [1, 1.2, 1] }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#02040a]">
      {/* Background stars / dust */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent" />

      {curtains.map((curtain, i) => (
        <motion.div
          key={i}
          className={`absolute bottom-0 left-[-100%] right-[-100%] h-full origin-bottom mix-blend-screen ${curtain.color}`}
          animate={{
            x: ["0%", "30%", "0%"],
            scaleY: curtain.scale,
          }}
          transition={{
            x: { duration: curtain.duration, repeat: Infinity, ease: "linear", delay: curtain.delay },
            scaleY: { duration: curtain.duration / 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg className="absolute bottom-0 w-full h-[120%]" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id={`${instanceId}-aurora-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                <stop offset="10%" stopColor="currentColor" stopOpacity={curtain.opacity} />
                <stop offset="50%" stopColor="currentColor" stopOpacity={curtain.opacity * 1.5} />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Draw a wavy curtain that looks like ribbons */}
            <path
              d={`M0,100 C10,${80 - i*5} 20,${60 + i*10} 30,100 C40,${70 - i*15} 50,${90 + i*5} 60,100 C70,${50 - i*10} 80,${80 + i*20} 90,100 C95,${70} 100,100 100,100 L0,100 Z`}
              fill={`url(#${instanceId}-aurora-grad-${i})`}
              className="blur-[6px]" // Strong blur to simulate glowing atmospheric gas
            />
            <path
              d={`M0,100 C15,${60 + i*10} 25,${40 - i*5} 35,100 C45,${80 + i*15} 55,${50 - i*10} 65,100 C75,${60 + i*5} 85,${90 - i*20} 100,100 L0,100 Z`}
              fill={`url(#${instanceId}-aurora-grad-${i})`}
              className="blur-[10px] opacity-90"
            />
            {/* Super bright core */}
            <path
              d={`M0,100 C10,${80 - i*5} 20,${60 + i*10} 30,100 C40,${70 - i*15} 50,${90 + i*5} 60,100 C70,${50 - i*10} 80,${80 + i*20} 90,100 C95,${70} 100,100 100,100 L0,100 Z`}
              fill={`url(#${instanceId}-aurora-grad-${i})`}
              className="blur-[2px] opacity-70 mix-blend-add" 
            />
          </svg>
        </motion.div>
      ))}

      {/* Base grounding shadow to hide the sharp bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#02040a] to-transparent z-10" />
    </div>
  );
}
