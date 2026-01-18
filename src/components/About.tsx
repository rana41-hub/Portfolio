"use client";

import { motion, useMotionValue, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, useEffect } from "react";


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

const skills = [
    { name: "Frontend", color: "251, 191, 36" },
    { name: "Backend", color: "34, 211, 238" },
    { name: "Performance", color: "52, 211, 153" },
    { name: "Motion", color: "251, 113, 133" }
];

export default function About() {
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
        </section>
    );
}
