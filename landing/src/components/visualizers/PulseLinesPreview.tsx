"use client";

import { motion } from "framer-motion";

export function PulseLinesPreview({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col justify-end items-center">
      <div className="relative w-full h-full flex items-end justify-center pb-[1px]">
        
        {/* Baseline ambient track */}
        <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900/60 to-transparent" />
        
        {/* Center intense core glow */}
        <motion.div
          animate={{
            opacity: active ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
            width: active ? ["60px", "110px", "60px"] : ["40px", "60px", "40px"]
          }}
          transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#22d3ee,0_0_20px_#22d3ee]"
        />

        {/* Center elegant peak wave (smooth bell curve) */}
        <motion.div
          animate={{
            height: active ? ["4px", "14px", "4px"] : ["4px", "8px", "4px"],
            opacity: active ? [0.6, 0.8, 0.6] : [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 w-24 flex justify-center"
        >
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full overflow-visible">
             <path
               d="M 0 40 C 30 40, 40 0, 50 0 C 60 0, 70 40, 100 40"
               fill="none"
               stroke="#67e8f9"
               strokeWidth="3"
               style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}
             />
             {/* Inner bright core for the wave */}
             <path
               d="M 0 40 C 30 40, 40 0, 50 0 C 60 0, 70 40, 100 40"
               fill="none"
               stroke="#ffffff"
               strokeWidth="1"
               style={{ filter: "drop-shadow(0 0 4px #ffffff)", opacity: 0.8 }}
             />
          </svg>
        </motion.div>

        {/* Left Primary Pulse */}
        <motion.div
          animate={{
            left: active ? ["50%", "10%"] : ["50%", "30%"],
            width: active ? ["0px", "80px", "10px"] : ["0px", "30px", "5px"],
            opacity: active ? [0.7, 0.7, 0] : [0.4, 0.4, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 h-[2px] bg-gradient-to-r from-white via-purple-400 to-transparent shadow-[0_0_12px_#a855f7]"
          style={{ transform: "translateX(-100%)", zIndex: 10 }}
        >
          {/* Head dot */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white,0_0_20px_#a855f7]" />
        </motion.div>

        {/* Left Secondary Pulse (Echo) */}
        <motion.div
          animate={{
            left: active ? ["50%", "10%"] : ["50%", "30%"],
            width: active ? ["0px", "50px", "8px"] : ["0px", "20px", "4px"],
            opacity: active ? [0.4, 0.6, 0] : [0.2, 0.3, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-0 h-[1px] bg-gradient-to-r from-cyan-200 via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee]"
          style={{ transform: "translateX(-100%)", zIndex: 9 }}
        />

        {/* Right Primary Pulse */}
        <motion.div
          animate={{
            right: active ? ["50%", "10%"] : ["50%", "30%"],
            width: active ? ["0px", "80px", "10px"] : ["0px", "30px", "5px"],
            opacity: active ? [0.7, 0.7, 0] : [0.4, 0.4, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 h-[2px] bg-gradient-to-l from-white via-purple-400 to-transparent shadow-[0_0_12px_#a855f7]"
          style={{ transform: "translateX(100%)", zIndex: 10 }}
        >
          {/* Head dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white,0_0_20px_#a855f7]" />
        </motion.div>

        {/* Right Secondary Pulse (Echo) */}
        <motion.div
          animate={{
            right: active ? ["50%", "10%"] : ["50%", "30%"],
            width: active ? ["0px", "50px", "8px"] : ["0px", "20px", "4px"],
            opacity: active ? [0.4, 0.6, 0] : [0.2, 0.3, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-0 h-[1px] bg-gradient-to-l from-cyan-200 via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee]"
          style={{ transform: "translateX(100%)", zIndex: 9 }}
        />

      </div>
    </div>
  );
}
