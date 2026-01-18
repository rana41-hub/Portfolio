"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

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
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;

        // Update styling based on scroll position (transparency)
        // Only set isScrolled if we are past the top

        // Hide logic: Hide if scrolling down/dissolving, show if scrolling up
        // Also don't hide if at the very top
        if (latest > previous && latest > 150) {
            setHidden(true); // Scrolling down
        } else {
            setHidden(false); // Scrolling up
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
                    {/* Logo Removed */}

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group"
                            >
                                {link.name}
                                <span className="absolute left-0 bottom-[-2px] w-0 h-[1px] bg-white/80 transition-all duration-300 group-hover:w-full" />
                            </button>
                        ))}
                    </div>

                    {/* Mobile Text Button (Hamburger alternative for minimal vibe) */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white uppercase text-xs tracking-[0.2em] z-50 mix-blend-difference"
                    >
                        {isMobileMenuOpen ? "Close" : "Menu"}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
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
        </>
    );
}
