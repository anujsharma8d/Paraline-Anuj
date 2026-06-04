"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SnowParticlesPreview({ active }: { active: boolean }) {
  const [flakes, setFlakes] = useState<{ id: number; left: string; top: string; size: number; delay: number; duration: number; isPink: boolean }[]>([]);

  useEffect(() => {
    // Generate sparse snow flakes
    const generatedFlakes = Array.from({ length: 15 }).map((_, i) => {
      return {
        id: i,
        left: `${10 + Math.random() * 80}%`, // Keep mostly towards the center
        top: `${-10 + Math.random() * 40}%`, // Start in the top half
        size: 2 + Math.random() * 3, // 2px to 5px
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        isPink: Math.random() > 0.6 // 40% chance to be pink/reddish
      };
    });
    setFlakes(generatedFlakes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-black to-transparent">
      {/* Top ambient glow */}
      <motion.div 
        className="absolute top-[-20%] left-[40%] w-[20%] h-[40%] rounded-full bg-rose-500/10 blur-[30px]"
        animate={{ opacity: active ? 0.6 : 0.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute top-[-20%] left-[50%] w-[20%] h-[40%] rounded-full bg-blue-500/10 blur-[30px]"
        animate={{ opacity: active ? 0.6 : 0.2 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />

      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full"
          style={{ 
            left: flake.left, 
            top: flake.top,
            width: flake.size,
            height: flake.size,
            backgroundColor: flake.isPink ? "#f43f5e" : "#60a5fa", // rose-500 or blue-400
            boxShadow: `0 0 ${flake.size * 2}px ${flake.isPink ? "rgba(244,63,94,0.6)" : "rgba(96,165,250,0.6)"}`
          }}
          animate={{
            y: active ? [0, 80] : [0, 20],
            x: active ? [0, Math.random() > 0.5 ? 20 : -20, Math.random() > 0.5 ? -10 : 10] : 0,
            opacity: active ? [0, 0.8, 0] : [0.1, 0.4, 0.1],
          }}
          transition={{
            y: { duration: active ? flake.duration : flake.duration * 2, repeat: Infinity, ease: "linear", delay: flake.delay },
            x: { duration: flake.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: flake.delay },
            opacity: { duration: active ? flake.duration : flake.duration * 2, repeat: Infinity, ease: "linear", delay: flake.delay }
          }}
        />
      ))}
    </div>
  );
}
