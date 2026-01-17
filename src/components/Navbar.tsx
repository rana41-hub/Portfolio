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
        setIsScrolled(latest > 50);

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
                className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isScrolled
                    ? "bg-black/30 backdrop-blur-md border-b border-white/5 py-4"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo Removed */}

                    {/* Desktop Menu - Centered if logo is gone, or use justify-end in parent */}
                    <div className="hidden md:flex items-center space-x-12 ml-auto">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                className="relative text-sm uppercase tracking-widest text-gray-300 hover:text-white transition-colors group"
                            >
                                {link.name}
                                <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
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
