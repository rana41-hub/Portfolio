"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section
            id="about"
            className="relative min-h-screen flex items-center justify-center bg-[#121212] py-24 overflow-hidden"
        >
            {/* Background Elements: Subtle radial gradient for depth / vignette */}
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"
            />

            <div className="relative z-10 max-w-4xl px-6 md:px-12 text-center">
                {/* Section Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-sm md:text-base font-light tracking-[0.3em] text-gray-500 uppercase mb-12"
                >
                    About Me
                </motion.h2>

                {/* Identity Statement */}
                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-8"
                >
                    Bridging the gap between <span className="text-gray-400">design</span> and <span className="text-gray-400">engineering</span>.
                </motion.h3>

                {/* Descriptive Paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-16"
                >
                    I am a full-stack developer who builds immersive digital experiences from end to end.
                    My work lives at the intersection of thoughtful design and solid engineering — where performance, scalability, and clean architecture matter just as much as aesthetics.
                    Every interaction is crafted to feel intentional, responsive, and meaningful.
                </motion.p>

                {/* Minimalist Highlights */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center justify-center gap-6 text-sm md:text-base font-mono text-gray-500 border border-white/10 px-8 py-3 rounded-full bg-white/5 backdrop-blur-sm"
                >
                    <span>Frontend</span>
                    <span className="text-gray-700">×</span>
                    <span>Backend</span>
                    <span className="text-gray-700">×</span>
                    <span>Performance</span>
                    <span className="text-gray-700">×</span>
                    <span>Motion</span>
                </motion.div>
            </div>
        </section>
    );
}
