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
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const targetIndexRef = useRef<number>(0);
    const lastRenderedIndexRef = useRef<number>(-1);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const { startFrame, frameCount, extension, prefix, padLength, supabaseBaseUrl } = sequenceMeta;

    const getFrameUrl = (index: number) => {
        const fileNum = (startFrame + index).toString().padStart(padLength, "0");
        const fileName = `${prefix}${fileNum}.${extension}`;
        return supabaseBaseUrl ? `${supabaseBaseUrl}/sequence/${fileName}` : `/sequence/${fileName}`;
    };

    useEffect(() => {
        if (frameCount <= 0) {
            console.warn("[ScrollyCanvas] Frame count is 0 or less, aborting load.");
            return;
        }

        console.log("[ScrollyCanvas] Loading initial frame:", getFrameUrl(0));

        // 1. Initial Frame
        const firstImg = new Image();
        
        firstImg.onload = () => {
            console.log("[ScrollyCanvas] Initial frame loaded successfully!");
            imagesRef.current[0] = firstImg;
            setIsLoaded(true);
        };
        
        firstImg.onerror = (err) => {
            console.error("[ScrollyCanvas] Failed to load initial frame:", getFrameUrl(0), err);
            // Even if the first frame fails, let's unlock the canvas so it isn't stuck forever
            setIsLoaded(true); 
        };

        firstImg.src = getFrameUrl(0);

        // The background preloader has been removed to free up network bandwidth
        // so that the sliding window can instantly fetch the frames you scroll to!
    }, [frameCount, startFrame, extension, prefix, padLength, supabaseBaseUrl]);

    const updateSlidingWindow = (currentIndex: number) => {
        const WINDOW_BACK = 10;
        const WINDOW_FORWARD = 20;
        
        // 1. RAM Cleanup: Unload frames outside the window
        for (let i = 0; i < imagesRef.current.length; i++) {
            if (imagesRef.current[i] && (i < currentIndex - WINDOW_BACK || i > currentIndex + WINDOW_FORWARD)) {
                imagesRef.current[i].src = "";
                delete imagesRef.current[i];
            }
        }

        // 2. RAM Decode: Load frames inside the window from Disk Cache into RAM
        const framesToLoad = [currentIndex];
        for (let offset = 1; offset <= WINDOW_FORWARD; offset++) {
            if (currentIndex + offset < frameCount) framesToLoad.push(currentIndex + offset);
            if (offset <= WINDOW_BACK && currentIndex - offset >= 0) framesToLoad.push(currentIndex - offset);
        }

        framesToLoad.forEach(index => {
            if (!imagesRef.current[index]) {
                const img = new Image();
                imagesRef.current[index] = img; 
                img.onload = () => {
                    requestAnimationFrame(() => renderFrame(targetIndexRef.current));
                };
                img.src = getFrameUrl(index);
            }
        });
    };

    const renderFrame = (targetIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Helper to check if an image is actually fully loaded and ready to draw
        const isImageLoaded = (img: HTMLImageElement | undefined) => img && img.complete && img.naturalHeight !== 0;

        // Find the closest available loaded frame to draw
        let bestIndex = targetIndex;
        if (!isImageLoaded(imagesRef.current[targetIndex])) {
            let minDiff = Infinity;
            for (let i = 0; i < imagesRef.current.length; i++) {
                if (isImageLoaded(imagesRef.current[i])) {
                    const diff = Math.abs(i - targetIndex);
                    if (diff < minDiff) {
                        minDiff = diff;
                        bestIndex = i;
                    }
                }
            }
        }

        const img = imagesRef.current[bestIndex];
        if (!isImageLoaded(img)) return;

        const pixelRatio = window.devicePixelRatio || 1;
        const targetWidth = window.innerWidth * pixelRatio;
        const targetHeight = window.innerHeight * pixelRatio;

        // Skip drawing if we are already showing this exact frame and the canvas hasn't resized
        if (lastRenderedIndexRef.current === bestIndex && canvas.width === targetWidth && canvas.height === targetHeight) {
            return;
        }

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;



        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
        }

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        // Draw image directly. The browser will handle synchronous decoding and memory management.
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        // Mark this frame as rendered so we don't redraw it pointlessly
        lastRenderedIndexRef.current = bestIndex;
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || frameCount <= 0) return;

        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(latest * frameCount)
        );
        
        // If we are still mathematically on the same integer frame, don't spam the CPU
        if (targetIndexRef.current === frameIndex) return;

        targetIndexRef.current = frameIndex;
        updateSlidingWindow(frameIndex);
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
