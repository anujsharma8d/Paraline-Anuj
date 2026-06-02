"use client";

import { useEffect, useRef } from "react";

export function AmbientWavePreview({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += active ? 0.05 : 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw two elegant cyan waves
      const drawWave = (offsetY: number, amplitude: number, phaseOffset: number, opacity: number) => {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const y = offsetY + Math.sin(x * 0.02 + time + phaseOffset) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      };

      // Add a subtle glow filter
      ctx.shadowBlur = active ? 15 : 5;
      ctx.shadowColor = "rgba(56, 189, 248, 0.5)";

      // Top wave
      drawWave(canvas.height * 0.3, active ? 15 : 5, 0, active ? 0.8 : 0.3);
      // Bottom wave
      drawWave(canvas.height * 0.7, active ? 10 : 3, Math.PI, active ? 0.5 : 0.2);

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [active]);

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={300} 
      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700" 
      style={{ opacity: active ? 1 : 0.6 }}
    />
  );
}
