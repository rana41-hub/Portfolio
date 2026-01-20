"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React from 'react';

interface OverlayProps {
    containerRef: React.RefObject<HTMLElement | null>;
}

export default function Overlay({ containerRef }: OverlayProps) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    const y2 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [100, 0, -100]);
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [0, 1, 0]);

    const y3 = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [100, 0, -100]);
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [0, 1, 0]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex flex-col justify-center">

            <motion.div
                style={{ y: y1, opacity: opacity1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-display font-bold tracking-[-0.01em] leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/90 pb-4"
                    style={{ textShadow: "0 4px 24px rgba(0,0,0,0.1)" }}
                >
                    Rana Pratap Singh.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="text-lg md:text-xl font-sans font-medium text-white/70 mt-2 max-w-lg tracking-wide"
                >
                    Full-stack developer crafting thoughtful digital experiences.
                </motion.p>

                {/* Scroll Cue */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-medium font-sans">
                        Scroll
                    </span>
                    <motion.div
                        className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/20 to-white/0"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>

            <motion.div
                style={{ y: y2, opacity: opacity2 }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-10 md:px-20"
            >
                <h2 className="text-5xl md:text-7xl font-display font-semibold text-white max-w-2xl tracking-[-0.03em] leading-[1.05]">
                    I build digital experiences.
                </h2>
            </motion.div>

            <motion.div
                style={{ y: y3, opacity: opacity3 }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-10 md:px-20 flex justify-end"
            >
                <h2 className="text-5xl md:text-7xl font-display font-semibold text-white max-w-2xl text-right tracking-[-0.03em] leading-[1.05]">
                    Engineering Excellence and scalability.
                </h2>
            </motion.div>
        </div>
    );
}
