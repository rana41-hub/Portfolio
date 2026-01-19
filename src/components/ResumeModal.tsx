"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEsc);
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[4px]"
                    />

                    {/* Modal Container */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                        className="fixed inset-0 z-50 m-auto w-full max-w-4xl h-[85vh] bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Header & Close Button */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                            <div>
                                <h2 className="text-2xl font-display font-medium text-white tracking-tight">Resume</h2>
                                <p className="text-xs text-white/40 mt-1 font-mono tracking-wide uppercase">PDF</p>
                            </div>

                            <div className="flex items-center gap-6">
                                <a
                                    href="/resume.pdf"
                                    download="Rana_Pratap_Resume.pdf"
                                    className="group relative px-6 py-2.5 rounded-full bg-white text-black text-sm font-sans font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center gap-2 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Download PDF
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-y-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    </span>
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                </a>

                                <button
                                    onClick={onClose}
                                    className="group p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-90">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 bg-white/[0.02] relative w-full overflow-hidden flex flex-col items-center justify-center">
                            <div className="w-full h-full max-w-[850px] p-4 md:p-8 flex flex-col">
                                <div className="flex-1 w-full bg-white rounded-md shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 relative ring-1 ring-white/10">
                                    <iframe
                                        src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                                        className="w-full h-full block"
                                        title="Resume PDF"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
