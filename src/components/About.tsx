"use client";

import { motion, useMotionValue, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import CertificateModal, { Certificate } from "./CertificateModal";


const ProximityChar = ({ char, mouseX, mouseY, className }: { char: string, mouseX: MotionValue<number>, mouseY: MotionValue<number>, className: string }) => {
    const ref = useRef<HTMLSpanElement>(null);


    const distance: MotionValue<number> = useTransform([mouseX, mouseY], ([x, y]: number[]) => {
        if (!ref.current) return 0;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    });


    const scaleRaw: MotionValue<number> = useTransform(distance, [0, 150], [1.15, 1]);
    const yRaw: MotionValue<number> = useTransform(distance, [0, 150], [-5, 0]);


    const scale = useSpring(scaleRaw, { stiffness: 50, damping: 15, mass: 1.5 });
    const y = useSpring(yRaw, { stiffness: 50, damping: 15, mass: 1.5 });

    return (
        <motion.span
            ref={ref}
            style={{ scale, y }}
            className={`inline-block cursor-default will-change-transform mx-[1px] ${className}`}
        >
            {char}
        </motion.span>
    );
};

const FluidText = ({ text, className = "" }: { text: string; className?: string }) => {
    const mouseX = useMotionValue(Infinity);
    const mouseY = useMotionValue(Infinity);

    function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
        mouseX.set(clientX);
        mouseY.set(clientY);
    }

    function handleMouseLeave() {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
    }

    return (
        <span
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-flex flex-wrap justify-center whitespace-pre relative z-20 cursor-default"
        >
            {text.split("").map((char, i) => (
                <ProximityChar
                    key={i}
                    char={char}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    className={className}
                />
            ))}
        </span>
    );
};

const educationData = [
    {
        institution: "BABU BANARASI DAS UNIVERSITY",
        details: [
            {
                degree: "Bachelor of Technology [CS & AI]",
                score: "9.35 GPA",
                duration: "2024 — 2028"
            }
        ]
    },
    {
        institution: "ST. ANTHONY PUBLIC SCHOOL",
        details: [
            {
                degree: "Senior Secondary (XII)",
                score: "92.2%",
                duration: "2023 — 2024"
            },
            {
                degree: "Secondary (X)",
                score: "90.83%",
                duration: "2021 — 2022"
            }
        ]
    }
];

const certificatesData: Certificate[] = [
    {
        id: "1",
        title: "CSS Completion",
        issuer: "Course Certification",
        year: "2024",
        description: "Comprehensive training in Cascading Style Sheets, mastering layout, typography, and responsive design techniques.",
        image: "/certificates/CSS Completion.jpg",
        art: "/certificates/icon-css.png"
    },
    {
        id: "2",
        title: "HTML Completion",
        issuer: "Course Certification",
        year: "2024",
        description: "Proficiency in HyperText Markup Language, semantic web structure, and best practices for accessibility.",
        image: "/certificates/HTML Completion.png",
        art: "/certificates/icon-html.png"
    },
    {
        id: "3",
        title: "Future Ready Skills",
        issuer: "Industry Certification",
        year: "2025",
        description: "Development of essential forward-looking skills for the modern digital landscape and workplace readiness.",
        image: "/certificates/Future ready skills.PNG",
        art: "/certificates/icon-future.png"
    },
    {
        id: "4",
        title: "Google Badge",
        issuer: "Google",
        year: "2024",
        description: "Official recognition of achievement and skill demonstration within the Google developer ecosystem.",
        image: "/certificates/Google badge.jpg",
        art: "/certificates/icon-google.png"
    },
    {
        id: "5",
        title: "Nirmana GDG Certificate",
        issuer: "Google Developer Groups",
        year: "2025",
        description: "Certificate of appreciation given by GDG Nirmana for community engagement and technical contribution.",
        image: "/certificates/Nirmana GDG certificate.jpg",
        art: "/certificates/icon-google.png"
    },
    {
        id: "6",
        title: "Trivia Week 1",
        issuer: "Tech Community",
        year: "2025",
        description: "Completion of the Week 1 August technical trivia challenge in Google Cloud arcade, demonstrating breadth of knowledge in cloud computing .",
        image: "/certificates/Trivia week 1.PNG",
        art: "/certificates/icon-trivia.png"
    },
    {
        id: "7",
        title: "Trivia Week 2",
        issuer: "Tech Community",
        year: "2025",
        description: "Consistently demonstrating technical expertise by securing recognition in the Week 2 trivia challenge.",
        image: "/certificates/Trivia week 2.PNG",
        art: "/certificates/icon-trivia.png"
    },
    {
        id: "8",
        title: "Trivia Week 3",
        issuer: "Tech Community",
        year: "2025",
        description: "Continued excellence in technical knowledge sharing and problem solving in the Week 3 challenge.",
        image: "/certificates/Trivia week 3.PNG",
        art: "/certificates/icon-trivia.png"
    },
    {
        id: "9",
        title: "Trivia Week 4",
        issuer: "Tech Community",
        year: "2025",
        description: "Final week victory in the month-long technical trivia series, showcasing sustained engagement and knowledge.",
        image: "/certificates/Trivia week 4.PNG",
        art: "/certificates/icon-trivia.png"
    },
    {
        id: "10",
        title: "Google AI Studio Certificate",
        issuer: "Google",
        year: "2026",
        description: "Proficiency in using Google AI Studio for building and deploying generative AI models.",
        image: "/certificates/Google AI Studio Certificate.png",
        art: "/certificates/icon-google.png"
    }
];

const skills = [
    { name: "Frontend", color: "251, 191, 36" },
    { name: "Backend", color: "34, 211, 238" },
    { name: "Performance", color: "52, 211, 153" },
    { name: "Motion", color: "251, 113, 133" }
];

export default function About() {
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

    return (
        <section
            id="about"
            className="relative min-h-screen flex items-center justify-center bg-[#121212] py-24 overflow-hidden"
        >


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
                        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-amber-900/30 rounded-full mix-blend-screen blur-[120px]"
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
                        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-rose-900/20 rounded-full mix-blend-screen blur-[150px]"
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

            <div className="relative z-10 max-w-4xl px-6 md:px-12 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-sm md:text-base font-display font-semibold tracking-[-0.03em] text-gray-500 uppercase mb-12"
                >
                    About Me
                </motion.h2>

                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-display font-bold text-white leading-[1.05] tracking-[-0.03em] mb-8"
                >
                    <FluidText text="Bridging the gap between" />
                    {" "}
                    <FluidText
                        text="design"
                        className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400"
                    />
                    {" "}
                    <FluidText text="and" />
                    {" "}
                    <FluidText
                        text="engineering"
                        className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-indigo-400"
                    />
                    .
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ opacity: 1, y: -2, transition: { duration: 0.3 } }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-xl font-sans font-normal text-gray-400 leading-[1.6] tracking-[-0.01em] max-w-2xl mx-auto mb-16 cursor-default transition-colors duration-300 hover:text-gray-300"
                >
                    I am a full-stack developer who builds immersive digital experiences from end to end.
                    My work lives at the intersection of thoughtful design and solid engineering — where performance, scalability, and clean architecture matter just as much as aesthetics.
                    Every interaction is crafted to feel intentional, responsive, and meaningful.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="mb-20 w-full max-w-2xl mx-auto mt-8"
                >
                    <h4 className="text-sm font-display font-semibold tracking-[-0.03em] text-gray-500 uppercase mb-4 text-center">
                        Education
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                        {educationData.map((edu, index) => (
                            <motion.div
                                key={index}
                                whileHover={{
                                    y: -2,
                                    borderColor: "rgba(255, 255, 255, 0.2)",
                                    backgroundColor: "rgba(255, 255, 255, 0.08)"
                                }}
                                transition={{ duration: 0.3 }}
                                className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors text-left flex flex-col justify-between"
                            >
                                <div>
                                    <h5 className="text-white font-medium text-base mb-6 leading-tight">
                                        {edu.institution}
                                    </h5>
                                    <div className="space-y-6">
                                        {edu.details.map((detail, i) => (
                                            <div key={i} className="relative">
                                                {i > 0 && (
                                                    <div className="absolute -top-3 left-0 w-8 h-[1px] bg-white/10" />
                                                )}
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-baseline justify-between gap-2">
                                                        <p className="text-gray-300 text-sm font-medium">
                                                            {detail.degree}
                                                        </p>
                                                        {detail.score && (
                                                            <span className="text-xs text-white/40 font-mono">
                                                                {detail.score}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">
                                                        {detail.duration}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
                    className="mb-20 w-full max-w-4xl mx-auto"
                >
                    <h4 className="text-sm font-display font-semibold tracking-[-0.03em] text-gray-500 uppercase mb-8 text-center">
                        Certifications
                    </h4>

                    <div
                        className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:-mx-8 md:px-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {certificatesData.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                layoutId={`cert-${cert.id}`}
                                onClick={() => setSelectedCertificate(cert)}
                                whileHover={{
                                    y: -5,
                                    borderColor: "rgba(255, 255, 255, 0.2)",
                                    backgroundColor: "rgba(255, 255, 255, 0.08)"
                                }}
                                transition={{ duration: 0.3 }}
                                className="group cursor-pointer relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors overflow-hidden min-w-[280px] w-[280px] snap-center flex-shrink-0 flex flex-col"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative h-48 w-full overflow-hidden bg-black/20 flex items-center justify-center p-6">
                                    {(cert.art || cert.image) && (
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <img
                                                src={cert.art || cert.image}
                                                alt=""
                                                className="w-auto h-full max-w-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                                            />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90" />
                                </div>

                                <div className="flex flex-col flex-grow justify-between p-6 pt-2">
                                    <div className="mb-8">
                                        <h5 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-amber-200 transition-colors">
                                            {cert.title}
                                        </h5>
                                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500">
                                            <span className="text-gray-400">{cert.issuer}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-600" />
                                            <span>{cert.year}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-white/50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M15 3h6v6"></path>
                                                <path d="M10 14 21 3"></path>
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            whileHover={{
                                scale: 1.05,
                                borderColor: `rgba(${skill.color}, 0.5)`,
                                backgroundColor: `rgba(${skill.color}, 0.1)`,
                                boxShadow: `0 0 20px rgba(${skill.color}, 0.2)`
                            }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-sans font-medium text-gray-300 cursor-default transition-colors shadow-lg shadow-black/20"
                        >
                            {skill.name}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <CertificateModal
                isOpen={!!selectedCertificate}
                onClose={() => setSelectedCertificate(null)}
                certificate={selectedCertificate}
            />
        </section>
    );
}
