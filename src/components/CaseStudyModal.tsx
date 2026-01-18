"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export interface ProjectData {
    title: string;
    category: string;
    year: string;
    description: string;
    images?: string[]; // Array of image URLs
    liveUrl?: string;
}

interface CaseStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectData | null;
}

export default function CaseStudyModal({ isOpen, onClose, project }: CaseStudyModalProps) {
    // Lock body scroll when modal is open
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

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 z-50 m-auto w-full max-w-5xl h-[90vh] md:h-[85vh] bg-[#121212]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 backdrop-blur-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Modal Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">

                            {/* Top Section: Image Gallery (Placeholder for now) */}
                            <div className="w-full h-[40vh] md:h-[50vh] bg-gradient-to-b from-gray-800 to-black relative">
                                {project.images && project.images.length > 0 ? (
                                    <div className="w-full h-full">
                                        {/* Simple setup for single image to start, expansion to carousel later */}
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${project.images[0]})` }} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600 font-display uppercase tracking-widest text-sm">
                                        Project Preview
                                    </div>
                                )}
                            </div>

                            {/* Bottom Section: Content */}
                            <div className="px-6 md:px-12 py-10">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-white/60 font-sans text-sm tracking-wide">{project.year}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/40" />
                                            <span className="text-white/60 font-sans text-sm tracking-wide">{project.category}</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-[1.05]">{project.title}</h2>
                                        <p className="text-gray-300 font-sans font-light text-lg leading-[1.6] max-w-2xl">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <div className="md:pt-2">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-sans font-medium hover:bg-gray-200 transition-colors duration-300"
                                            >
                                                Live Preview
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Extra dummy content block to simulate depth */}
                                <div className="border-t border-white/10 pt-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400 font-sans text-sm">
                                    <div>
                                        <h4 className="text-white font-medium mb-2">Role</h4>
                                        <p>Frontend Development, UI/UX Design</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-2">Stack</h4>
                                        <p>React, TypeScript, Tailwind CSS, Framer Motion</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-2">Deliverables</h4>
                                        <p>Responsive Web App, Design System</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
