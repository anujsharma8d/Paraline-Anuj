"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { GITHUB_URL } from "@/lib/paraline-api";

const Github = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Twitter = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="relative mt-auto w-full border-t border-white/5 bg-transparent backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 py-6 md:flex-row lg:px-8">

        {/* Left Side: Copyright */}
        <div className="flex items-center">
          <span className="text-[11px] font-medium tracking-[0.15em] text-muted/80 hover:text-white transition-colors cursor-default uppercase">
            © 2026 PARALINE
          </span>
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold tracking-[0.15em] text-muted/80 transition-colors hover:text-white uppercase">
            Contact / GitHub
          </a>
          <a href="/terms" className="text-[11px] font-semibold tracking-[0.15em] text-muted/80 transition-colors hover:text-white uppercase">
            Terms & Conditions
          </a>
          <a href="/privacy" className="text-[11px] font-semibold tracking-[0.15em] text-muted/80 transition-colors hover:text-white uppercase">
            Privacy Policy
          </a>
          <a href="/faq" className="text-[11px] font-semibold tracking-[0.15em] text-muted/80 transition-colors hover:text-white uppercase">
            FAQ
          </a>
        </div>

      </div>
    </footer>
  );
}
