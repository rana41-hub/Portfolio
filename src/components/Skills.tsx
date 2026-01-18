"use client";

import { motion } from "framer-motion";

interface SkillCategory {
    title: string;
    skills: string[];
}

const skillCategories: SkillCategory[] = [
    {
        title: "Core Frontend",
        skills: ["React", "TypeScript", "HTML5", "CSS3"]
    },
    {
        title: "Styling & Motion",
        skills: ["Tailwind CSS", "Framer Motion", "GSAP", "Sass"]
    },
    {
        title: "3D & Advanced Graphics",
        skills: ["Three.js", "WebGL", "R3F", "Canvas API"]
    },
    {
        title: "Backend & Infrastructure",
        skills: ["Node.js", "Express", "PostgreSQL", "Firebase"]
    },
    {
        title: "Collaboration & Tools",
        skills: ["Git", "GitHub", "Figma", "Vercel"]
    }
];

const PRIMARY_SKILLS = ["React", "TypeScript", "Git", "GitHub", "Framer Motion"];

export default function Skills() {
    return (
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-32 px-6 bg-[#080808] overflow-hidden">

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
                        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-cyan-900/20 rounded-full mix-blend-screen blur-[120px]"
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
                        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[80vw] bg-blue-900/20 rounded-full mix-blend-screen blur-[100px]"
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
                        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-teal-900/20 rounded-full mix-blend-screen blur-[150px]"
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

            <div className="relative z-10 max-w-5xl w-full">

                {/* Header */}
                <div className="text-center mb-20 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight"
                    >
                        Skills
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-xl text-gray-400 font-sans font-light tracking-wide max-w-lg mx-auto"
                    >
                        Tools I use to design, engineer, and ship experiences.
                    </motion.p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover="groupHover"
                            variants={{
                                groupHover: { y: -5, transition: { duration: 0.8, ease: "easeInOut" } }
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            className="flex flex-col items-center md:items-start group p-6 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-colors duration-700"
                        >
                            <motion.h3
                                variants={{
                                    groupHover: { color: "rgba(255, 255, 255, 0.9)" }
                                }}
                                transition={{ duration: 0.3 }}
                                className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-6 border-b border-white/5 pb-2 w-full text-center md:text-left transition-colors"
                            >
                                {category.title}
                            </motion.h3>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                {category.skills.map((skill) => {
                                    const isPrimary = PRIMARY_SKILLS.includes(skill);
                                    return (
                                        <motion.div
                                            key={skill}
                                            variants={{
                                                groupHover: { y: -3, transition: { duration: 0.4, ease: "easeOut" } }
                                            }}
                                            whileHover={{
                                                y: -6,
                                                scale: 1.02,
                                                boxShadow: "0 4px 20px -5px rgba(255, 255, 255, 0.1)",
                                                borderColor: "rgba(255, 255, 255, 0.3)",
                                                transition: { duration: 0.2 }
                                            }}
                                            className={`px-4 py-2 rounded-full text-sm font-sans cursor-default transition-colors duration-300
                                                ${isPrimary
                                                    ? "bg-white/[0.06] border border-white/[0.12] text-gray-200"
                                                    : "bg-white/[0.03] border border-white/5 text-gray-400"
                                                }
                                            `}
                                        >
                                            {skill}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Closing Line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-24 text-center"
                >
                    <p className="text-xs font-mono text-gray-600/60 uppercase tracking-widest">
                        Always learning. Always refining.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
