"use client";

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { FaLinkedin, FaGithub, FaWhatsapp, FaTimes, FaEnvelope, FaSun, FaMoon, FaSearch, FaEllipsisV } from 'react-icons/fa';
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
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const searchContainerRef = useRef<HTMLElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    // Referencias para Swipe to close en mobile
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);

    // Bloquear el scroll de la página cuando el menú móvil está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Detectar scroll para ocultar iconos sociales flotantes en mobile
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setIsScrolling(false);
            }, 700); // Vuelve a mostrarlos 700ms despues de detener el scroll
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cierra el buscador al hacer clic fuera del componente en móvil
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isSearchOpen && searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);

    // Initializamos el campo de búsqueda con el parámetro de la URL
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setMounted(true);
        // Sincronizar el valor inicial del input si hay una búsqueda activa
        if (searchParams) {
            setSearchTerm(searchParams.get('q') || '');
        }
    }, [searchParams]);

    // Lógica de debounce para optimizar el rendimiento y evitar múltiples redirecciones al teclear
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const currentQuery = searchParams?.get('q') || '';
            // Solo actulizamos la URL si el término ha cambiado
            if (searchTerm !== currentQuery) {
                const params = new URLSearchParams(searchParams?.toString() || '');
                if (searchTerm) {
                    params.set('q', searchTerm);
                } else {
                    params.delete('q');
                }

                // Si no estamos en la página del blog y el usuario busca algo, redirigirlo
                if (!pathname.startsWith('/blog') && searchTerm) {
                    router.push(`/blog?${params.toString()}`);
                } else if (pathname.startsWith('/blog')) {
                    // Si ya estamos en blog, reemplazar para no apilar historial al teclear
                    router.push(`${pathname}?${params.toString()}`);
                }
            }
        }, 400); // 400ms de retraso es ideal para escribir cómodamente

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, searchParams, pathname, router]);

    const navLinks = [
        { name: 'INICIO', href: '/' },
        { name: 'SOBRE MI', href: '/about' },
        { name: 'ARTICULOS', href: '/blog' },
        { name: 'PROYECTOS', href: '/projects' },
    ];

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartY.current = e.targetTouches[0].clientY;
        touchEndY.current = e.targetTouches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndY.current = e.targetTouches[0].clientY;
        const offset = Math.max(0, touchEndY.current - touchStartY.current); // Solo permitir arrastrar hacia abajo
        setDragOffset(offset);
    };

    const handleTouchEnd = () => {
        const offset = touchEndY.current - touchStartY.current;
        if (offset > 50) {
            setIsOpen(false);
        }
        setDragOffset(0); // Restablecer siempre al terminar el toque
    };

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
            {/* Desktop Top Bar */}
            <nav className="hidden lg:flex fixed top-0 left-0 w-full h-20 bg-bg-linear-to-b to-white/60 dark:to-black/40 backdrop-blur-xs items-center justify-between px-10 z-40 transition-all duration-500 shadow-[0_0_20px_rgba(147,51,234,0.1)] dark:shadow-[0_0_20px_rgba(192,132,252,0.05)]">
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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

            {/* Mobile/Tablet Floating Social Links (Hidden on scroll) */}
            <div className={`lg:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-transform duration-500 ease-in-out ${isScrolling ? 'translate-x-full' : 'translate-x-0'}`}>
                <div className="flex flex-col items-center space-y-6 bg-purple-100/90 dark:bg-[#120a1a]/80 backdrop-blur-md p-3 py-6 rounded-l-2xl border-y border-l border-purple-300/50 dark:border-purple-800/50 shadow-[0_0_20px_rgba(147,51,234,0.2)] dark:shadow-[0_0_20px_rgba(192,132,252,0.15)]">
                    {/* Tablet Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`p-2 rounded-full transition-all transform hover:scale-110 ${neonIconHover} text-purple-800/70 dark:text-gray-400`}
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                        </button>
                    )}
                    <div className="w-6 h-px bg-purple-300/50 dark:bg-purple-800/50"></div>
                    {Object.entries(socialLinks).map(([key, value]) => (
                        <a
                            key={key}
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-purple-800/70 dark:text-gray-400 transition-all duration-200 transform hover:scale-110 ${neonIconHover}`}
                        >
                            {renderIcon(key, 22)}
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom Sheet Menu (Mobile Overlay) */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMenu}
            />
            <div 
                className={`fixed bottom-12 left-0 w-full bg-white/95 dark:bg-[#120a1a]/95 backdrop-blur-xl border-t border-purple-300/50 dark:border-purple-800/50 rounded-t-3xl z-50 p-6 shadow-[0_-10px_40px_rgba(147,51,234,0.15)] dark:shadow-[0_-10px_40px_rgba(192,132,252,0.15)] lg:hidden flex flex-col items-center ${dragOffset === 0 ? 'transition-transform duration-300 ease-out' : ''}`}
                style={{
                    transform: isOpen ? `translateY(${dragOffset}px)` : 'translateY(150%)',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="w-16 h-1.5 bg-purple-300 dark:bg-purple-800 rounded-full mb-8 cursor-pointer"
                    onClick={toggleMenu}
                />
                        <nav className="flex flex-col w-full px-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={toggleMenu}
                                    className={`py-4 px-6 rounded-2xl text-center text-lg font-bold tracking-widest transition-all ${pathname === link.href ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 drop-shadow-[0_0_8px_rgba(147,51,234,0.4)] dark:drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]' : `text-purple-950/70 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 ${neonTextHover}`}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
            </div>

            {/* Bottom Navbar (Mobile/Tablet) */}
            <nav
                ref={searchContainerRef}
                className="fixed bottom-0 left-0 w-full h-12 bg-white/85 dark:bg-[#120a1a]/85 backdrop-blur-lg border-t border-purple-300/50 dark:border-purple-800/50 z-50 flex items-center px-2 sm:px-4 justify-between lg:hidden shadow-[0_-5px_25px_rgba(147,51,234,0.15)] dark:shadow-[0_-5px_25px_rgba(192,132,252,0.1)] pb-safe"
            >
                {/* Carousel of links */}
                <div
                    className="flex-1 overflow-x-auto flex flex-nowrap items-center gap-x-2 sm:gap-x-4 pr-4 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                    `}} />
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`snap-center whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${pathname === link.href ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 shadow-[0_0_10px_rgba(147,51,234,0.2)] dark:shadow-[0_0_10px_rgba(192,132,252,0.2)]' : `text-purple-900/70 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20`}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-4 pl-3 sm:pl-4 border-l border-purple-200 dark:border-purple-800/50">
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className={`p-2.5 rounded-full transition-all hover:bg-purple-100 dark:hover:bg-purple-900/40 ${isSearchOpen ? 'text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-purple-800/50' : 'text-purple-800 dark:text-purple-400'} ${neonIconHover}`}
                    >
                        <FaSearch size={22} />
                    </button>
                    <button
                        onClick={toggleMenu}
                        className={`p-2.5 rounded-full transition-all hover:bg-purple-100 dark:hover:bg-purple-900/40 ${isOpen ? 'text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-purple-800/50' : 'text-purple-800 dark:text-purple-400'} ${neonIconHover}`}
                    >
                        <FaEllipsisV size={24} />
                    </button>
                </div>

                {/* Mobile Search Overlay */}
                {isSearchOpen && (
                    <div className="absolute bottom-20 left-4 right-4 bg-white/95 dark:bg-[#120a1a]/95 p-4 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-800/50 backdrop-blur-md z-50 animate-in slide-in-from-bottom-5">
                        <div className="relative w-full">
                            <input
                                type="search"
                                placeholder="Buscar artículos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-purple-50 dark:bg-purple-900/30 border border-purple-300/50 dark:border-purple-800/50 rounded-full py-3 px-5 pr-12 text-sm text-purple-950 dark:text-gray-200 outline-none focus:border-purple-600 dark:focus:border-purple-400 focus:shadow-[0_0_15px_rgba(147,51,234,0.4)] dark:focus:shadow-[0_0_15px_rgba(192,132,252,0.4)] transition-all placeholder-purple-800/40 dark:placeholder-purple-400/50"
                                autoFocus
                            />
                            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400" />
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}