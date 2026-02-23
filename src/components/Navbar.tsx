"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FaLinkedin, FaGithub, FaWhatsapp, FaTimes, FaEnvelope, FaSun, FaMoon } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';

const IconMap: Record<string, React.ElementType> = {
    linkedin: FaLinkedin,
    github: FaGithub,
    whatsapp: FaWhatsapp,
    email: FaEnvelope,
};

interface NavbarProps {
    socialLinks: Record<string, string>;
}

export default function Navbar({ socialLinks }: NavbarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { name: 'INICIO', href: '/' },
        { name: 'SOBRE MI', href: '/sobre-mi' },
        { name: 'PROYECTOS', href: '/projects' },
        { name: 'ARTICULOS', href: '/blog' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    const renderIcon = (key: string, size: number) => {
        const IconComponent = IconMap[key.toLowerCase()];
        if (!IconComponent) return null;
        return <IconComponent size={size} />;
    };

    const neonTextHover = "hover:text-purple-600 dark:hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.8)] dark:hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]";
    const neonIconHover = "hover:text-purple-600 dark:hover:text-purple-400 hover:drop-shadow-[0_0_10px_rgba(147,51,234,1)] dark:hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)]";

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-sm z-50 transition-all duration-300"
                    onClick={toggleMenu}
                />
            )}

            {/* Side Menu (Mobile/Toggle) */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-purple-100/90 dark:bg-purple-950/40 backdrop-blur-md z-50 border-l border-purple-300/50 dark:border-purple-800/50 shadow-[0_0_30px_rgba(147,51,234,0.2)] dark:shadow-[0_0_30px_rgba(192,132,252,0.2)] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full p-8">
                    <div className="flex justify-end mb-12">
                        <FaTimes
                            size={28}
                            className={`text-purple-700 dark:text-purple-500 cursor-pointer transition-all ${neonIconHover}`}
                            onClick={toggleMenu}
                        />
                    </div>

                    <nav className="flex flex-col space-y-8 mb-auto">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={toggleMenu}
                                className={`text-lg font-medium tracking-widest transition-all ${pathname === link.href ? 'text-purple-800 dark:text-purple-300 drop-shadow-[0_0_5px_rgba(147,51,234,0.8)] dark:drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]' : `text-purple-900/70 dark:text-gray-400 ${neonTextHover}`}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Redes Sociales en Menu Lateral */}
                    <div className="flex space-x-4 mt-auto">
                        {Object.entries(socialLinks).map(([key, value]) => (
                            <a
                                key={key}
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-purple-800/70 dark:text-gray-400 transition-all duration-200 transform hover:scale-110 ${neonIconHover}`}
                            >
                                {renderIcon(key, 24)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop Top Bar */}
            <nav className="hidden lg:flex fixed top-0 left-0 w-full h-20 bg-white/60 dark:bg-black/40 backdrop-blur-md border-b border-purple-200/50 dark:border-purple-900/40 items-center justify-between px-10 z-40 transition-all duration-500 shadow-[0_0_20px_rgba(147,51,234,0.1)] dark:shadow-[0_0_20px_rgba(192,132,252,0.05)]">
                {/* Menu Links */}
                <div className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-bold tracking-widest transition-all ${pathname === link.href ? 'text-purple-800 dark:text-purple-300 drop-shadow-[0_0_8px_rgba(147,51,234,0.6)] dark:drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]' : `text-purple-950/70 dark:text-gray-300 ${neonTextHover}`}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Search & Social Icons */}
                <div className="flex items-center gap-6">
                    <input
                        type="search"
                        placeholder="Buscar artículos..."
                        className="bg-purple-50/50 dark:bg-purple-950/40 border border-purple-300/50 dark:border-purple-800/50 rounded-full py-2 px-5 text-sm text-purple-950 dark:text-gray-200 outline-none focus:border-purple-600 dark:focus:border-purple-400 focus:shadow-[0_0_15px_rgba(147,51,234,0.4)] dark:focus:shadow-[0_0_15px_rgba(192,132,252,0.4)] transition-all w-64 placeholder-purple-800/40 dark:placeholder-purple-400/50"
                    />

                    {/* Theme Toggle Button */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`p-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 transition-all transform hover:scale-110 ${neonIconHover} shadow-[0_0_10px_rgba(147,51,234,0.2)] dark:shadow-[0_0_10px_rgba(192,132,252,0.2)]`}
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                        </button>
                    )}

                    <div className="flex items-center gap-4 text-purple-800/70 dark:text-gray-400">
                        {Object.entries(socialLinks).map(([key, value]) => (
                            <a
                                key={key}
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`transition-all duration-200 transform hover:scale-110 ${neonIconHover}`}
                            >
                                {renderIcon(key, 20)}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Tablet & Mobile Sidebar/Button */}
            <nav className="lg:hidden fixed right-0 top-0 md:h-full md:w-20 w-auto h-auto md:bg-linear-to-r md:from-transparent md:to-purple-100/80 md:dark:to-purple-950/40 flex flex-col justify-between md:py-10 p-6 z-40 bg-transparent transition-all duration-500">
                <div className="flex justify-center flex-col gap-6 items-center">
                    <HiMenuAlt3
                        size={32}
                        className={`text-purple-800 dark:text-purple-400 cursor-pointer transform rotate-180 drop-shadow-md bg-white/50 dark:bg-black/40 md:bg-transparent p-1 rounded-md md:p-0 md:rounded-none transition-all ${neonIconHover}`}
                        onClick={toggleMenu}
                    />

                    {/* Mobile/Tablet Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`md:hidden p-2 rounded-full bg-white/50 dark:bg-black/40 text-purple-800 dark:text-purple-300 transition-all drop-shadow-md ${neonIconHover}`}
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                        </button>
                    )}
                </div>

                {/* Tablet Icons (hidden on mobile) */}
                <div className="hidden md:flex flex-col items-center space-y-8 text-purple-800/70 dark:text-gray-400">
                    {/* Tablet Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`p-2 rounded-full transition-all transform hover:scale-110 ${neonIconHover}`}
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                        </button>
                    )}

                    {Object.entries(socialLinks).map(([key, value]) => (
                        <a
                            key={key}
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-all duration-200 transform hover:scale-110 ${neonIconHover}`}
                        >
                            {renderIcon(key, 22)}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex justify-center">
                    <div className="w-1 h-12 bg-purple-600 dark:bg-purple-500 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.8)] dark:shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
                </div>
            </nav>
        </>
    );
}