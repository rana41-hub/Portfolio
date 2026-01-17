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
            {/* Section 1 - Center */}
            <motion.div
                style={{ y: y1, opacity: opacity1 }}
                className="absolute inset-0 flex items-center justify-center text-center"
            >
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mix-blend-difference">
                    Rana Pratap Singh.
                </h1>
            </motion.div>

            {/* Section 2 - Left */}
            <motion.div
                style={{ y: y2, opacity: opacity2 }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-10 md:px-20"
            >
                <h2 className="text-5xl md:text-7xl font-semibold text-white max-w-2xl">
                    I build digital experiences.
                </h2>
            </motion.div>

            {/* Section 3 - Right */}
            <motion.div
                style={{ y: y3, opacity: opacity3 }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-10 md:px-20 flex justify-end"
            >
                <h2 className="text-5xl md:text-7xl font-semibold text-white max-w-2xl text-right">
                    Bridging design and engineering.
                </h2>
            </motion.div>
        </div>
    );
}
