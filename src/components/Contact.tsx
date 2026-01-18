"use client";

import { motion } from "framer-motion";

const SOCIAL_LINKS = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ranapratapsingh41",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452H16.892V14.881C16.892 13.553 16.866 11.844 15.041 11.844C13.191 11.844 12.909 13.288 12.909 14.787V20.452H9.354V9H12.768V10.565H12.816C13.291 9.664 14.453 8.714 16.184 8.714C19.782 8.714 20.447 11.083 20.447 14.133V20.452ZM5.337 7.433C4.197 7.433 3.274 6.509 3.274 5.37C3.274 4.23 4.197 3.307 5.337 3.307C6.477 3.307 7.4 4.23 7.4 5.37C7.4 6.509 6.477 7.433 5.337 7.433ZM3.562 20.452H7.125V9H3.562V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.226 0.792 24 1.771 24H22.222C23.2 24 24 23.226 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" />
            </svg>
        )
    },
    {
        name: "X (Twitter)",
        url: "https://x.com/SinghRana41",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99003 21.75H1.68003L9.41003 12.915L1.25403 2.25H8.08003L12.793 8.481L18.244 2.25ZM17.087 19.769H18.914L7.08403 4.126H5.12403L17.087 19.769Z" />
            </svg>
        )
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/devop_41/",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.232C18.106 2.289 18.962 2.49 19.712 2.783C20.488 3.085 21.166 3.513 21.838 4.185C22.509 4.857 22.937 5.535 23.239 6.311C23.53 7.062 23.731 7.917 23.789 9.174C23.846 10.439 23.858 10.819 23.858 14.023C23.858 17.227 23.846 17.607 23.789 18.872C23.731 20.129 23.531 20.984 23.239 21.735C22.937 22.511 22.509 23.189 21.838 23.861C21.166 24.532 20.488 24.96 19.712 25.262C18.962 25.553 18.106 25.755 16.85 25.812C15.584 25.869 15.204 25.881 12 25.881C8.796 25.881 8.416 25.869 7.15 25.812C5.894 25.755 5.038 25.554 4.288 25.262C3.512 24.96 2.834 24.532 2.162 23.861C1.491 23.189 1.063 22.511 0.761 21.735C0.47 20.984 0.269 20.129 0.212 18.872C0.155 17.607 0.142 17.227 0.142 14.023C0.142 10.819 0.155 10.439 0.212 9.174C0.269 7.917 0.47 7.062 0.761 6.311C1.063 5.535 1.491 4.857 2.162 4.185C2.834 3.513 3.512 3.085 4.288 2.783C5.038 2.49 5.894 2.29 7.15 2.232C8.416 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C5.775 0.130 4.905 0.333 4.14 0.63C3.351 0.937 2.68 1.344 2.011 2.013C1.341 2.682 0.934 3.353 0.627 4.142C0.33 4.907 0.127 5.777 0.069 7.055C0.011 8.335 0 8.743 0 12.002C0 15.261 0.011 15.669 0.069 16.949C0.127 18.227 0.33 19.097 0.627 19.862C0.934 20.651 1.341 21.322 2.011 21.991C2.68 22.66 3.351 23.067 4.14 23.374C4.905 23.671 5.775 23.874 7.053 23.932C8.333 23.99 8.741 24.004 12 24.004C15.259 24.004 15.667 23.99 16.947 23.932C18.225 23.874 19.095 23.671 19.86 23.374C20.649 23.067 21.32 22.66 21.989 21.991C22.659 21.322 23.066 20.651 23.373 19.862C23.67 19.098 23.873 18.227 23.931 16.949C23.989 15.669 24.004 15.261 24.004 12.002C24.004 8.743 23.989 8.335 23.931 7.055C23.873 5.777 23.67 4.907 23.373 4.142C23.066 3.353 22.659 2.682 21.989 2.013C21.32 1.344 20.649 0.937 19.86 0.63C19.095 0.333 18.225 0.130 16.947 0.072C15.667 0.014 15.259 0 12 0Z" />
                <path d="M12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.162 12 18.162C15.403 18.162 18.162 15.403 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16.002C9.79 16.002 7.998 14.21 7.998 12C7.998 9.79 9.79 7.998 12 7.998C14.21 7.998 16.002 9.79 16.002 12C16.002 14.21 14.21 16.002 12 16.002Z" />
                <path d="M18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.596C16.965 6.392 17.61 7.037 18.406 7.037C19.202 7.037 19.847 6.392 19.847 5.596C19.847 4.8 19.202 4.155 18.406 4.155Z" />
            </svg>
        )
    },
    {
        name: "Discord",
        url: "https://discord.com/channels/@me",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.37C18.835 3.687 17.241 3.193 15.568 2.906C15.539 2.901 15.511 2.915 15.498 2.94C15.297 3.295 15.068 3.766 14.908 4.141C13.155 3.879 11.407 3.879 9.682 4.141C9.522 3.759 9.288 3.295 9.087 2.94C9.074 2.915 9.046 2.901 9.017 2.906C7.34 3.193 5.746 3.687 4.264 4.37C4.252 4.375 4.243 4.385 4.238 4.397C1.229 8.895 0.407 13.284 0.811 17.625C0.812 17.643 0.824 17.659 0.839 17.671C2.81 19.261 4.717 20.228 6.589 20.806C6.613 20.813 6.638 20.803 6.652 20.782C7.094 20.179 7.487 19.539 7.822 18.867C7.838 18.834 7.822 18.796 7.788 18.783C7.16 18.547 6.561 18.267 5.989 17.947C5.943 17.921 5.939 17.854 5.982 17.823C6.108 17.728 6.231 17.63 6.35 17.529C6.368 17.513 6.395 17.512 6.415 17.525C10.158 19.237 14.441 19.237 18.156 17.525C18.176 17.513 18.203 17.513 18.222 17.529C18.341 17.63 18.465 17.728 18.591 17.823C18.633 17.854 18.629 17.921 18.583 17.947C18.006 18.267 17.408 18.547 16.78 18.783C16.746 18.796 16.731 18.835 16.746 18.867C17.081 19.539 17.474 20.179 17.915 20.782C17.929 20.803 17.955 20.813 17.978 20.806C19.851 20.228 21.758 19.261 23.729 17.671C23.745 17.659 23.756 17.643 23.757 17.625C24.254 12.636 22.95 8.275 20.317 4.37ZM8.02 15.332C6.839 15.332 5.867 14.249 5.867 12.916C5.867 11.583 6.819 10.499 8.02 10.499C9.23 10.499 10.192 11.592 10.173 12.916C10.173 14.249 9.221 15.332 8.02 15.332ZM16.574 15.332C15.393 15.332 14.421 14.249 14.421 12.916C14.421 11.583 15.373 10.499 16.574 10.499C17.784 10.499 18.746 11.592 18.727 12.916C18.727 14.249 17.775 15.332 16.574 15.332Z" />
            </svg>
        )
    }
];

export default function Contact() {
    return (
        <section id="contact" className="relative min-h-[70vh] flex flex-col items-center justify-center py-32 px-6 bg-[#050505] overflow-hidden">

            {/* Layered Background Elements - Darker & Subtler than previous sections */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#050505]" />

                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.6, 0.5],
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-orange-900/20 rounded-full mix-blend-screen blur-[120px]"
                    />

                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 5,
                        }}
                        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-rose-900/20 rounded-full mix-blend-screen blur-[150px]"
                    />
                </div>

                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: "150px 150px",
                    }}
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl mx-auto text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 tracking-tight">
                        Get In Touch
                    </h2>
                    <p className="text-xl md:text-2xl font-sans font-light text-gray-400 mb-16 tracking-wide opacity-80">
                        Open to collaborations and meaningful ideas.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mb-20"
                >
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=raghuvanshiranapratapsingh@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl md:text-5xl font-sans font-light text-white opacity-80 hover:opacity-100 transition-all duration-500 hover:text-white/90 relative group inline-block tracking-tight"
                    >
                        raghuvanshiranapratapsingh@gmail.com
                        <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full opacity-50" />
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center gap-12"
                >
                    <div className="flex items-center gap-8 md:gap-12">
                        {SOCIAL_LINKS.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                className="text-gray-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    <p className="text-xs font-mono text-gray-700 uppercase tracking-widest mt-8">
                        Available for select projects.
                    </p>
                </motion.div>

            </div>

            {/* Footer */}
            <footer className="absolute bottom-6 w-full text-center text-gray-500 font-sans text-xs tracking-[-0.01em] opacity-60">
                © 2026 Rana Pratap Singh
            </footer>
        </section>
    );
}
