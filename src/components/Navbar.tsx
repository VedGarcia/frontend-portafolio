"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaLinkedin, FaGithub, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'INICIO', href: '/' },
        { name: 'SOBRE MI', href: '/sobre-mi' },
        { name: 'PROYECTOS', href: '/proyectos' },
        { name: 'ARTICULOS', href: '/blog' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
                    onClick={toggleMenu}
                />
            )}

            {/* Side Menu */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-[#0d0714] border-l border-purple-900/30 z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full p-8">
                    <div className="flex justify-end mb-12">
                        <FaTimes
                            size={28}
                            className="text-purple-500 cursor-pointer hover:text-purple-400 transition-colors"
                            onClick={toggleMenu}
                        />
                    </div>

                    <nav className="flex flex-col space-y-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={toggleMenu}
                                className={`text-lg font-medium tracking-widest transition-colors ${pathname === link.href ? 'text-purple-500' : 'text-gray-400 hover:text-purple-400'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto flex justify-center space-x-8 text-gray-400">
                        <a href="#" className="hover:text-purple-500 transition-colors"><FaLinkedin size={24} /></a>
                        <a href="#" className="hover:text-purple-500 transition-colors"><FaWhatsapp size={24} /></a>
                        <a href="#" className="hover:text-purple-500 transition-colors"><FaGithub size={24} /></a>
                    </div>
                </div>
            </div>

            {/* Static Sidebar (Always Visible or Desktop only) */}
            <nav className="fixed right-0 top-0 h-full w-20 bg-[#0d0714] border-l border-purple-900/20 flex flex-col justify-between py-10 z-50">
                <div className="flex justify-center">
                    <HiMenuAlt3
                        size={28}
                        className="text-purple-500 cursor-pointer hover:text-purple-400 transition-colors transform rotate-180"
                        onClick={toggleMenu}
                    />
                </div>

                <div className="flex flex-col items-center space-y-8 text-gray-400">
                    <a href="#" className="hover:text-purple-500 transition-colors"><FaLinkedin size={22} /></a>
                    <a href="#" className="hover:text-purple-500 transition-colors"><FaWhatsapp size={22} /></a>
                    <a href="#" className="hover:text-purple-500 transition-colors"><FaGithub size={22} /></a>
                </div>

                <div className="flex justify-center">
                    <div className="w-1 h-12 bg-purple-600 rounded-full"></div>
                </div>
            </nav>
        </>
    );
}