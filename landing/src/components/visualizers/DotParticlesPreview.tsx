"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function DotParticlesPreview({ active }: { active: boolean }) {
  const [dots, setDots] = useState<{ id: number; left: string; top: string; delay: number }[]>([]);

  useEffect(() => {
    // Generate static dot positions around the perimeter
    const generatedDots = Array.from({ length: 40 }).map((_, i) => {
      const isTopBottom = Math.random() > 0.5;
      const isLeft = Math.random() > 0.5;
      
      let left = "0%";
      let top = "0%";

      if (isTopBottom) {
        left = `${Math.random() * 100}%`;
        top = isLeft ? "0px" : "calc(100% - 4px)";
      } else {
        top = `${Math.random() * 100}%`;
        left = isLeft ? "0px" : "calc(100% - 4px)";
      }

      return {
        id: i,
        left,
        top,
        delay: Math.random() * 2
      };
    });
    setDots(generatedDots);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute h-1 w-1 rounded-full bg-accent shadow-[0_0_5px_rgba(56,189,248,0.8)]"
          style={{ left: dot.left, top: dot.top }}
          animate={{
            scale: active ? [0.5, 1.5, 0.5] : [0.5, 0.8, 0.5],
            opacity: active ? [0.2, 1, 0.2] : [0.1, 0.3, 0.1],
            backgroundColor: active && Math.random() > 0.7 ? "#a855f7" : "#38bdf8", // occasionally flash magenta
          }}
          transition={{
            duration: active ? 0.3 + Math.random() * 0.5 : 2,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
