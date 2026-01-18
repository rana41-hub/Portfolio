"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CaseStudyModal, { ProjectData } from "./CaseStudyModal";

const projects: ProjectData[] = [
    {
        title: "Ecosync Nexus",
        category: "Web Application",
        year: "2025",
        description: "Energy monitoring and management system that checks energy consumption stats and gives AI insights to reduce the energy consumption.",
        images: ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"],
        liveUrl: "https://sustainovation-2025.vercel.app/"
    },
    {
        title: "Washington Guardian",
        category: "Web Application",
        year: "2024",
        description: "AI-powered health monitoring platform that monitors real-time health data, AI insights, and gives location-based emergency reporting.",
        images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"],
        liveUrl: "https://washinton-guardian-sah.vercel.app/"
    },
    {
        title: "Echo Earth",
        category: "Web Application",
        year: "2024",
        description: "AI-powered platform that uses real-time climate data, voice synthesis, and storytelling to personify the Earth.",
        images: ["https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop"],
        liveUrl: "https://sensational-sherbet-67a5e1.netlify.app/"
    },
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (project: ProjectData) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300); // Clear data after animation
    };

    return (
        <section className="relative z-20 min-h-screen py-32 px-6 md:px-20 overflow-hidden" id="projects">

            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#0A0A0A]" /> {/* Slightly darker base */}

                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.4, 0.3], // Balanced opacity
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-amber-700/25 rounded-full mix-blend-screen blur-[120px]"
                    />

                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.5, 0.3], // Balanced opacity
                            x: [0, -40, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[80vw] bg-slate-700/25 rounded-full mix-blend-screen blur-[100px]"
                    />

                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.3, 0.2], // Balanced opacity
                            x: [0, 30, 0],
                        }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 5,
                        }}
                        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-rose-700/25 rounded-full mix-blend-screen blur-[150px]"
                    />
                </div>

                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: "150px 150px",
                    }}
                />

                {/* Balanced overlay opacity: Darker than 40, lighter than 80 */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-55" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <h3 className="text-2xl font-display font-semibold text-gray-400 mb-16 uppercase tracking-[-0.03em] leading-[1.05]">Selected Works</h3>

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
                                    <span className="text-sm font-sans font-medium text-gray-400">{project.year}</span>
                                    <span className="px-3 py-1 rounded-full text-xs font-sans font-medium border border-white/20 text-gray-300 backdrop-blur-md leading-[1.2]">{project.category}</span>
                                </div>
                                <h4 className="text-4xl font-display font-bold text-white mb-2 tracking-[-0.02em] leading-[1.05]">{project.title}</h4>
                                <p className="text-gray-400 max-w-xs font-sans font-normal leading-[1.6] tracking-[-0.01em]">{project.description}</p>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleOpenModal(project)}
                                    className="px-6 py-2 rounded-full bg-white text-black font-sans font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 leading-[1.2]"
                                >
                                    View Case Study
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <CaseStudyModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                project={selectedProject}
            />
        </section >
    );
}
