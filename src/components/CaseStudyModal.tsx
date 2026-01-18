"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export interface ProjectData {
    title: string;
    category: string;
    year: string;
    description: string;
    images?: string[];
    liveUrl?: string;
    problem: string;
    solution: string;
    outcome: string;
    role: string;
    techStack: string[];
    deliverables: string;
}

interface CaseStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectData | null;
}

export default function CaseStudyModal({ isOpen, onClose, project }: CaseStudyModalProps) {
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
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-50 m-auto w-full max-w-6xl h-[90vh] bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 backdrop-blur-md border border-white/5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {/* Hero Image Section */}
                            <div className="relative w-full h-[50vh] bg-[#121212]">
                                {project.images && project.images.length > 0 ? (
                                    <>
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{ backgroundImage: `url(${project.images[0]})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20 font-display uppercase tracking-widest">
                                        No Preview Available
                                    </div>
                                )}

                                {/* Floating Title on Hero */}
                                <div className="absolute bottom-12 left-6 md:left-12 max-w-4xl">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-xs font-mono uppercase tracking-wider text-white/80">
                                            {project.category}
                                        </span>
                                        <span className="text-white/60 font-mono text-sm">{project.year}</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight tracking-tight">
                                        {project.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-6 md:px-12 py-16">
                                {/* Main Content: Description & Case Study */}
                                <div className="lg:col-span-2 space-y-12">
                                    {/* High-level overview */}
                                    <div>
                                        <h3 className="text-xl font-display text-white mb-4">Overview</h3>
                                        <p className="text-lg text-gray-300 font-sans font-light leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Problem / Solution / Outcome Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-mono uppercase tracking-wider text-amber-400/80">The Challenge</h4>
                                            <p className="text-gray-400 font-sans leading-relaxed text-sm">
                                                {project.problem}
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-mono uppercase tracking-wider text-blue-400/80">The Solution</h4>
                                            <p className="text-gray-400 font-sans leading-relaxed text-sm">
                                                {project.solution}
                                            </p>
                                        </div>
                                        <div className="md:col-span-2 space-y-4 pt-4">
                                            <h4 className="text-sm font-mono uppercase tracking-wider text-emerald-400/80">The Outcome</h4>
                                            <p className="text-gray-400 font-sans leading-relaxed text-sm">
                                                {project.outcome}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar: Metadata & Actions */}
                                <div className="space-y-10">
                                    {/* Action Button */}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex items-center justify-center gap-3 w-full py-4 rounded-lg bg-white text-black font-sans font-medium transition-all duration-300 hover:bg-gray-200 hover:scale-[1.02]"
                                        >
                                            <span>Live Preview</span>
                                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    )}

                                    {/* Metadata List */}
                                    <div className="space-y-8 text-sm">
                                        <div>
                                            <h4 className="text-white/40 font-mono uppercase tracking-wider mb-3">Role</h4>
                                            <p className="text-white font-sans">{project.role}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-white/40 font-mono uppercase tracking-wider mb-3">Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech) => (
                                                    <span key={tech} className="px-2 py-1 rounded border border-white/10 bg-white/5 text-gray-300 text-xs">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-white/40 font-mono uppercase tracking-wider mb-3">Deliverables</h4>
                                            <p className="text-white font-sans">{project.deliverables}</p>
                                        </div>
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
