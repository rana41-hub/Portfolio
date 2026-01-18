"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
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

      <Contact />
    </main>
  );
}
