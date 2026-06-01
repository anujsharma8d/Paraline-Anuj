import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paraline - Pro Edge Visualizer",
  description: "Paraline is an audio-reactive edge visualizer for Windows desktops, featuring cinematic themes and real-time audio capture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex bg-background text-foreground">
        <div className="pointer-events-none fixed inset-0 z-[-1] bg-noise" />
        
        <Sidebar />
        
        <main className="flex-1 lg:pl-64 relative z-10 flex flex-col min-h-screen">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
