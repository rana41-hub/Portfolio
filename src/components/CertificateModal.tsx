"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export interface Certificate {
    title: string;
    issuer: string;
    year: string;
    description: string;
    image?: string;
    art?: string;
    link?: string;
    id: string;
}

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    certificate: Certificate | null;
}

export default function CertificateModal({ isOpen, onClose, certificate }: CertificateModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!certificate) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        className="fixed inset-0 z-50 m-auto w-full max-w-4xl h-fit max-h-[85vh] bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col ring-1 ring-white/5"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-300 backdrop-blur-md border border-white/10 mx-2 my-2 group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="overflow-y-auto custom-scrollbar p-0 flex flex-col md:flex-row h-full">
                            <div className="relative w-full md:w-[55%] bg-white/5 flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-full border-b md:border-b-0 md:border-r border-white/10">
                                {certificate.image ? (
                                    <div className="relative w-full h-full p-8 md:p-12 flex items-center justify-center">
                                        <div className="relative shadow-2xl shadow-black/30 rounded-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                                            <img
                                                src={certificate.image}
                                                alt={certificate.title}
                                                className="w-full h-auto object-contain max-h-[60vh] md:max-h-[70vh]"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-white/20 h-[300px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                            <path d="M12 14h.01"></path>
                                        </svg>
                                        <span className="font-display uppercase tracking-widest text-sm">Certificate Preview</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                            </div>

                            <div className="w-full md:w-[45%] p-8 md:p-10 flex flex-col justify-center bg-transparent space-y-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-mono uppercase tracking-wider text-amber-200/80 shadow-glow-sm">
                                            {certificate.issuer}
                                        </span>
                                        <span className="text-white/40 font-mono text-sm border-l border-white/10 pl-3">{certificate.year}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-3xl font-display font-bold text-white leading-tight mb-4 drop-shadow-lg">
                                        {certificate.title}
                                    </h2>
                                    <div className="h-1 w-12 bg-gradient-to-r from-amber-400 to-transparent rounded-full mb-6 opacity-80" />
                                    <p className="text-white/70 font-sans leading-relaxed text-sm md:text-base font-light">
                                        {certificate.description}
                                    </p>
                                </div>

                                <div className="pt-4">
                                    {certificate.link && (
                                        <a
                                            href={certificate.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white font-sans font-medium transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-white/5"
                                        >
                                            <span>Verify Credential</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
