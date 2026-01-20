"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export default function ScrollyCanvas({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameCount = 119;

    useEffect(() => {
        const loadImages = async () => {
            const promises: Promise<void>[] = [];

            for (let i = 0; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const formattedIndex = i.toString().padStart(3, "0");
                    img.src = `/sequence/frame_${formattedIndex}.webp`;

                    img.onload = async () => {
                        try {
                            await img.decode();
                        } catch (err) {
                            console.warn("Image decode failed", err);
                        }
                        imagesRef.current[i] = img;
                        resolve();
                    };

                    img.onerror = (e) => {
                        console.error("Failed to load image", i, e);
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[index];

        if (!canvas || !img) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || imagesRef.current.length === 0) return;

        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(latest * frameCount)
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    useEffect(() => {
        if (isLoaded) {
            renderFrame(0);
        }
    }, [isLoaded]);

    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
            <canvas ref={canvasRef} className="block w-full h-full" />
            {!isLoaded && <div className="absolute inset-0 flex items-center justify-center text-white/20">Loading...</div>}
        </div>
    );
}
