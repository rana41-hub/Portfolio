"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import About from "@/components/About";

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

      {/* Projects Section */}
      <div id="projects">
        <Projects />
      </div>

      {/* Skills Section (Placeholder) */}
      <section id="skills" className="min-h-screen flex items-center justify-center bg-[#121212] py-20">
        <div className="max-w-4xl px-6">
          <h2 className="text-4xl font-display font-bold text-white mb-12 text-center tracking-[-0.03em] leading-[1.05]">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-gray-300">
            {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Node.js", "WebGL"].map(skill => (
              <div key={skill} className="p-4 border border-white/10 rounded-lg hover:border-white/30 transition-colors font-sans font-medium text-gray-300">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

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
