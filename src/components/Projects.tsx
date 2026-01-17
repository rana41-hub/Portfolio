"use client";

import { motion } from "framer-motion";

const projects = [
    {
        title: "Project Alpha",
        category: "Web Application",
        year: "2025",
        description: "A high-performance financial dashboard.",
    },
    {
        title: "Neon Horizon",
        category: "Immersive 3D",
        year: "2024",
        description: "WebGL experience awarded Awwwards SOTD.",
    },
    {
        title: "Flux OS",
        category: "Operating System",
        year: "2026",
        description: "Concept specific operating system UI.",
    },
    {
        title: "Aether",
        category: "Mobile App",
        year: "2025",
        description: "Mindfulness and meditation assistant.",
    },
];

export default function Projects() {
    return (
        <section className="relative z-20 bg-[#121212] py-32 px-6 md:px-20 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-xl font-mono text-gray-400 mb-16 uppercase tracking-widest">Selected Works</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative h-[400px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-colors duration-500"
                        >
                            {/* Blur Glow Effect */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] group-hover:bg-purple-500/30 transition-all duration-500" />

                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-sm font-mono text-gray-400">{project.year}</span>
                                    <span className="px-3 py-1 rounded-full text-xs border border-white/20 text-gray-300 backdrop-blur-md">{project.category}</span>
                                </div>
                                <h4 className="text-4xl font-bold text-white mb-2">{project.title}</h4>
                                <p className="text-gray-400 max-w-xs">{project.description}</p>
                            </div>

                            <div className="flex justify-end">
                                <button className="px-6 py-2 rounded-full bg-white text-black font-semibold opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    View Case Study
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
