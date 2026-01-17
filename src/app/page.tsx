"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-[#121212] flex flex-col">
      {/* Scroll Sequence Container */}
      <div ref={containerRef} className="relative h-[500vh]">
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-[96vh] w-full overflow-hidden">
          <ScrollyCanvas containerRef={containerRef} />
          <Overlay containerRef={containerRef} />
        </div>
      </div>

      {/* Projects Section */}
      <Projects />

      {/* Footer / Padding */}
      <footer className="py-20 text-center text-gray-500 font-mono text-xs">
        © 2026 Rana Pratap Singh
      </footer>
    </main>
  );
}
