"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Skills from "@/components/Skills";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-[#121212] flex flex-col">
      <Navbar />

      {/* Scroll Sequence Container - "Home" */}
      <div id="home" ref={containerRef} className="relative h-[500vh]">
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-[96vh] w-full overflow-hidden">
          <ScrollyCanvas containerRef={containerRef} />
          <Overlay containerRef={containerRef} />
        </div>
      </div>

      <About />

      <div id="projects">
        <Projects />
      </div>

      <div id="skills">
        <Skills />
      </div>

      {/* Contact Section (Placeholder) */}
      <section id="contact" className="min-h-[50vh] flex items-center justify-center bg-[#121212] py-20">
        <div className="text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-8 tracking-[-0.03em] leading-[1.05]">Get In Touch</h2>
          <a href="mailto:hello@ranapratap.com" className="text-2xl font-sans font-normal text-gray-400 hover:text-white underline decoration-1 underline-offset-8 transition-colors tracking-[-0.01em]">
            hello@ranapratap.com
          </a>
        </div>
      </section>

      {/* Footer / Padding */}
      <footer className="py-20 text-center text-gray-500 font-sans text-xs border-t border-white/5 mx-6 tracking-[-0.01em]">
        © 2026 Rana Pratap Singh
      </footer>
    </main>
  );
}
