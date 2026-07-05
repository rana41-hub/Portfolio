"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import type { SequenceMetadata } from "@/utils/sequence";

interface ScrollyCanvasProps {
    containerRef: React.RefObject<HTMLElement | null>;
    sequenceMeta: SequenceMetadata;
}

export default function ScrollyCanvas({ containerRef, sequenceMeta }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Simple array to hold the Image objects
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const { startFrame, frameCount, extension, prefix, padLength } = sequenceMeta;

    const getFrameUrl = (index: number) => {
        const fileNum = (startFrame + index).toString().padStart(padLength, "0");
        return `/sequence/${prefix}${fileNum}.${extension}`;
    };

    useEffect(() => {
        if (frameCount <= 0) return;

        let isCancelled = false;
        
        const loadImagesProgressively = async () => {
            // 1. Load the first frame immediately so we can show it
            const firstImg = new Image();
            firstImg.src = getFrameUrl(0);
            
            firstImg.onload = () => {
                if (isCancelled) return;
                imagesRef.current[0] = firstImg;
                setIsLoaded(true);
            };

            // 2. Load the rest of the sequence in batches
            const loadRemaining = async () => {
                const BATCH_SIZE = 8;
                for (let i = 1; i < frameCount; i += BATCH_SIZE) {
                    if (isCancelled) break;
                    
                    const batchPromises: Promise<void>[] = [];
                    for (let j = i; j < i + BATCH_SIZE && j < frameCount; j++) {
                        batchPromises.push(
                            new Promise<void>((resolve) => {
                                const img = new Image();
                                img.src = getFrameUrl(j);
                                
                                img.onload = () => {
                                    imagesRef.current[j] = img;
                                    resolve();
                                };
                                img.onerror = () => {
                                    resolve(); // Resolve anyway to not block the batch
                                };
                            })
                        );
                    }
                    await Promise.all(batchPromises);
                    // Yield to main thread
                    await new Promise(resolve => setTimeout(resolve, 30));
                }
            };

            loadRemaining();
        };

        loadImagesProgressively();

        return () => {
            isCancelled = true;
        };
    }, [frameCount, startFrame, extension, prefix, padLength]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[index];

        if (!canvas || !img) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const pixelRatio = window.devicePixelRatio || 1;
        const targetWidth = window.innerWidth * pixelRatio;
        const targetHeight = window.innerHeight * pixelRatio;

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
        }

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        // Draw image directly. The browser will handle synchronous decoding and memory management.
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || frameCount <= 0) return;

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
            {!isLoaded && <div className="absolute inset-0 flex items-center justify-center text-white/20">Loading Canvas...</div>}
        </div>
    );
}
