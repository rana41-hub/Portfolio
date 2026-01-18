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
        liveUrl: "https://sustainovation-2025.vercel.app/",
        problem: "Users needed a real-time way to track and reduce energy consumption across multiple appliances in homes and workplace, but existing solutions were fragmented and lacked actionable insights.",
        solution: "We built a centralized dashboard integrating IoT data with AI-driven analytics to predict usage patterns and suggest reduction strategies.",
        outcome: "The platform empowered users to reduce energy waste by up to 20% within the first month of beta testing.",
        role: "Frontend Developer and UI/UX Designer",
        techStack: ["React", "TypeScript", "Tailwind CSS", "AI/ML Integration"],
        deliverables: "Web Application, Dashboard UI, AI Integration"
    },
    {
        title: "Washington Guardian",
        category: "Web Application",
        year: "2024",
        description: "AI-powered health monitoring platform that monitors real-time health data, AI insights, and gives location-based emergency reporting.",
        images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"],
        liveUrl: "https://washinton-guardian-sah.vercel.app/",
        problem: "Emergency response times and proactive health monitoring were insufficient in remote areas, leading to delayed medical interventions.",
        solution: "Developed a location-aware health guardian system that correlates vital signs with geo-data to alert emergency situations and outbreak alerts automatically.",
        outcome: "Improved emergency response coordination simulations by 30% and provided peace of mind to at-risk individuals.",
        role: "Frontend Engineer",
        techStack: ["React", "Geolocation API", "Node.js", "WebSockets"],
        deliverables: "Responsive PWA, Real-time Alert System"
    },
    {
        title: "Echo Earth",
        category: "Creative Web App",
        year: "2024",
        description: "AI-powered platform that uses real-time climate data, voice synthesis, and storytelling to personify the Earth.",
        images: ["https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop"],
        liveUrl: "https://sensational-sherbet-67a5e1.netlify.app/",
        problem: "Climate change data often feels abstract and disconnected from human emotion, making it hard to inspire action.",
        solution: "Created an immersive 'voice of the Earth' that translates climate datasets into spoken narratives and evolving visual soundscapes.",
        outcome: "Increased user engagement with climate metrics and helped raise awareness about climate change .",
        role: "Full Stack Developer",
        techStack: ["React", "ElevenLabs Voice API", "Framer Motion"],
        deliverables: "Interactive Experience, Voice Synthesis Engine"
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
        <section className="relative z-20 min-h-screen py-32 px-6 md:px-20 overflow-hidden bg-[#050505]" id="projects">

            {/* Layered Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#050505]" />

                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.6, 0.5],
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full mix-blend-screen blur-[120px]"
                    />

                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 0.6, 0.4],
                            x: [0, -40, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[80vw] bg-indigo-900/20 rounded-full mix-blend-screen blur-[100px]"
                    />

                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 5,
                        }}
                        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-violet-900/20 rounded-full mix-blend-screen blur-[150px]"
                    />
                </div>

                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: "150px 150px",
                    }}
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000000_120%)] opacity-80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="mb-20">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-gray-400 mb-4">Selected Works</h3>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                        Engineering <span className="text-white/40">meet</span> Creativity
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                            whileHover={{ y: -8 }}
                            onClick={() => handleOpenModal(project)}
                            className="group relative cursor-pointer"
                        >
                            {/* Card Body */}
                            <div className="relative h-[450px] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5 transition-colors duration-500 group-hover:border-white/10 group-hover:bg-[#0F0F0F]">

                                {/* Image Overlay Gradient (Top down) */}
                                <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A] z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                                        style={{ backgroundImage: `url(${project.images?.[0] || ""})` }}
                                    />
                                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/20" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-10">
                                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xs font-mono uppercase tracking-wider text-white/60 bg-white/5 px-2 py-1 rounded border border-white/5 backdrop-blur-sm">
                                                {project.year}
                                            </span>
                                            <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                                                {project.category}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-white transition-colors duration-300">
                                            {project.title}
                                        </h3>

                                        <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-sm line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Action Hint */}
                                    <div className="mt-6 flex items-center gap-2 text-white/0 group-hover:text-white/80 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-sm font-medium">
                                        <span>View Case Study</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </div>
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
