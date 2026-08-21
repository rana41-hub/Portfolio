"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

interface ScrollyVideoProps {
    containerRef: React.RefObject<HTMLElement | null>;
    videoSrc: string;
}

export default function ScrollyVideo({ containerRef, videoSrc }: ScrollyVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const frameRef = useRef<number | null>(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (videoRef.current) {
            const duration = videoRef.current.duration;
            if (!isNaN(duration) && duration > 0) {
                if (frameRef.current !== null) {
                    cancelAnimationFrame(frameRef.current);
                }
                
                frameRef.current = requestAnimationFrame(() => {
                    if (videoRef.current) {
                        videoRef.current.currentTime = latest * duration;
                    }
                });
            }
        }
    });

    useEffect(() => {
        if (videoRef.current && videoRef.current.readyState >= 1) {
            setIsLoaded(true);
        }
        
        return () => {
            if (frameRef.current !== null) {
                cancelAnimationFrame(frameRef.current);
            }
        }
    }, []);

    const handleLoaded = () => setIsLoaded(true);

    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
            <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover block"
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={handleLoaded}
                onLoadedData={handleLoaded}
                onCanPlay={handleLoaded}
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    Loading Video...
                </div>
            )}
        </div>
    );
}
