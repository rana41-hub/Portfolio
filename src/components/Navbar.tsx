"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import ResumeModal from "./ResumeModal";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;


        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const scrollToSection = (href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: hidden ? -25 : 0,
                    opacity: hidden ? 0 : 1,
                    filter: hidden ? "blur(10px)" : "blur(0px)"
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${hidden ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"
                    }`}
            >
                <div className="flex items-center justify-center gap-10 px-8 py-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/10">

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                className="relative text-sm font-sans font-medium hover:text-white transition-colors group leading-[1.2] text-gray-300/80"
                            >
                                {link.name}
                                <span className="absolute left-0 bottom-[-2px] w-0 h-[1px] bg-white/80 transition-all duration-300 group-hover:w-full" />
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white uppercase text-xs tracking-[0.2em] z-50 mix-blend-difference"
                    >
                        {isMobileMenuOpen ? "Close" : "Menu"}
                    </button>
                </div>
            </motion.nav>

            {/* Resume CTA Button - Top Right */}
            <motion.button
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: hidden ? -25 : 0,
                    opacity: hidden ? 0 : 1,
                    filter: hidden ? "blur(10px)" : "blur(0px)"
                }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setIsResumeOpen(true)}
                className={`fixed top-5 right-5 md:top-6 md:right-8 z-50 flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-white/15 bg-black/20 backdrop-blur-md text-sm font-sans font-medium text-white/90 transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group ${hidden ? "pointer-events-none" : "pointer-events-auto"}`}
            >
                <span className="relative">Resume</span>
                <svg
                    className="w-3.5 h-3.5 text-white/70 transition-transform duration-300 ease-out group-hover:text-white group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7l-10 10M8 7h9v9" />
                </svg>
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
                    >
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.name}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => scrollToSection(link.href)}
                                className="text-3xl font-light text-white hover:text-gray-400 transition-colors"
                            >
                                {link.name}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Resume Modal */}
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
    );
}
