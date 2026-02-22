"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaLinkedin, FaGithub, FaWhatsapp, FaTimes, FaEnvelope } from 'react-icons/fa';
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

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
                    onClick={toggleMenu}
                />
            )}

            {/* Side Menu (Mobile/Toggle) */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-[#0d0714] border-l border-purple-900/30 z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full p-8">
                    <div className="flex justify-end mb-12">
                        <FaTimes
                            size={28}
                            className="text-purple-500 cursor-pointer hover:text-purple-400 transition-colors"
                            onClick={toggleMenu}
                        />
                    </div>

                    <nav className="flex flex-col space-y-8 mb-auto">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={toggleMenu}
                                className={`text-lg font-medium tracking-widest transition-colors ${pathname === link.href ? 'text-purple-500' : 'text-gray-400 hover:text-purple-400'}`}
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
                                className="text-gray-400 hover:text-purple-500 transition-colors"
                            >
                                {renderIcon(key, 24)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Static Sidebar */}
            <nav className="fixed right-0 top-0 h-full w-20 bg-[#0d0714] border-l border-purple-900/20 flex flex-col justify-between py-10 z-50">
                <div className="flex justify-center">
                    <HiMenuAlt3
                        size={28}
                        className="text-purple-500 cursor-pointer hover:text-purple-400 transition-colors transform rotate-180"
                        onClick={toggleMenu}
                    />
                </div>

                <div className="flex flex-col items-center space-y-8 text-gray-400">
                    {Object.entries(socialLinks).map(([key, value]) => (
                        <a
                            key={key}
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-purple-500 transition-all duration-300 transform hover:scale-110"
                        >
                            {renderIcon(key, 22)}
                        </a>
                    ))}
                </div>

                <div className="flex justify-center">
                    <div className="w-1 h-12 bg-purple-600 rounded-full shadow-[0_0_10px_#7c3aed]"></div>
                </div>
            </nav>
        </>
    );
}