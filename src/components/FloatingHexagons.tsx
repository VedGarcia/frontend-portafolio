"use client";

import { usePathname } from 'next/navigation';

// Definimos las posiciones según la imagen de referencia
const POSITIONS: Record<string, any> = {
    '/': [ // Home: Arriba a la izquierda
        { top: '15%', left: '5%', size: 150, speed: '20s' },
        { top: '25%', left: '15%', size: 80, speed: '15s', reverse: true },
        { top: '10%', left: '20%', size: 100, speed: '25s' },
        { top: '35%', left: '20%', size: 180, speed: '40s', reverse: true },

    ],
    '/blog': [ // Blog: Abajo a la izquierda 
        { top: '70%', left: '10%', size: 180, speed: '30s', reverse: true },
        { top: '60%', left: '5%', size: 90, speed: '20s' },
        { top: '80%', left: '20%', size: 120, speed: '35s' },
        { top: '55%', left: '15%', size: 70, speed: '20s', reverse: true },

    ],
    '/about': [ // Sobre mí: Derecha media 
        { top: '40%', left: '75%', size: 200, speed: '25s' },
        { top: '30%', left: '85%', size: 100, speed: '18s', reverse: true },
        { top: '55%', left: '80%', size: 140, speed: '28s' },
        { top: '75%', left: '70%', size: 180, speed: '40s', reverse: true },
    ],
    '/blog/*': [ // Blog: Abajo a la izquierda 
        { top: '45%', left: '10%', size: 200, speed: '25s' },
        { top: '35%', left: '5%', size: 100, speed: '18s', reverse: true },
        { top: '65%', left: '20%', size: 140, speed: '28s' },
        { top: '25%', left: '15%', size: 70, speed: '40s', reverse: true },
    ],
};

export default function FloatingHexagons() {
    const pathname = usePathname();

    // No renderizar en proyectos para no saturar
    if (pathname === '/projects') return null;

    // Si la ruta no está definida, usamos la posición del Home por defecto
    const currentPositions = POSITIONS[pathname] || POSITIONS['/'];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {currentPositions.map((config: any, i: number) => (
                <div
                    key={i}
                    className="absolute hexagon-wrapper transition-all duration-1000 ease-in-out"
                    style={{
                        top: config.top,
                        left: config.left,
                        width: `${config.size}px`,
                        height: `${config.size}px`,
                    }}
                >
                    <svg
                        viewBox="0 0 100 100"
                        className={`w-full h-full opacity-20 fill-none stroke-purple-500 stroke-[0.8] ${config.reverse ? 'animate-spin-reverse' : 'animate-spin-custom'
                            }`}
                        style={{ '--speed': config.speed } as any}
                    >
                        <polygon points="50 1, 95 25, 95 75, 50 99, 5 75, 5 25" />
                    </svg>
                </div>
            ))}
        </div>
    );
}