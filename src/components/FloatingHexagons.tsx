"use client";

import { usePathname } from 'next/navigation';

// Definimos las posiciones según la imagen de referencia.
// Agregamos mTop, mLeft, y mSize para ajustar el layout en dispositivos móviles
const POSITIONS: Record<string, any> = {
    '/': [ // Home: Arriba a la izquierda (Escritorio), diseminado en móvil
        { top: '15%', left: '5%', size: 150, mTop: '10%', mLeft: '-5%', mSize: 110, speed: '20s' },
        { top: '25%', left: '15%', size: 80, mTop: '25%', mLeft: '80%', mSize: 60, speed: '15s', reverse: true },
        { top: '10%', left: '20%', size: 100, mTop: '5%', mLeft: '60%', mSize: 75, speed: '25s' },
        { top: '35%', left: '20%', size: 180, mTop: '40%', mLeft: '85%', mSize: 120, speed: '40s', reverse: true },
    ],
    '/blog': [ // Blog: Abajo a la izquierda 
        { top: '70%', left: '10%', size: 180, mTop: '65%', mLeft: '-10%', mSize: 120, speed: '30s', reverse: true },
        { top: '60%', left: '5%', size: 90, mTop: '50%', mLeft: '5%', mSize: 70, speed: '20s' },
        { top: '80%', left: '20%', size: 120, mTop: '75%', mLeft: '75%', mSize: 85, speed: '35s' },
        { top: '55%', left: '15%', size: 70, mTop: '45%', mLeft: '80%', mSize: 55, speed: '20s', reverse: true },
    ],
    '/about': [ // Sobre mí: Derecha media 
        { top: '40%', left: '75%', size: 200, mTop: '20%', mLeft: '70%', mSize: 130, speed: '25s' },
        { top: '30%', left: '85%', size: 100, mTop: '8%', mLeft: '85%', mSize: 70, speed: '18s', reverse: true },
        { top: '55%', left: '80%', size: 140, mTop: '65%', mLeft: '-5%', mSize: 100, speed: '28s' },
        { top: '75%', left: '70%', size: 180, mTop: '80%', mLeft: '-10%', mSize: 110, speed: '40s', reverse: true },
    ],
    '/blog/*': [ // Blog Artículos
        { top: '45%', left: '10%', size: 200, mTop: '15%', mLeft: '-5%', mSize: 120, speed: '25s' },
        { top: '35%', left: '5%', size: 100, mTop: '10%', mLeft: '85%', mSize: 65, speed: '18s', reverse: true },
        { top: '65%', left: '20%', size: 140, mTop: '65%', mLeft: '-10%', mSize: 100, speed: '28s' },
        { top: '25%', left: '15%', size: 70, mTop: '40%', mLeft: '85%', mSize: 55, speed: '40s', reverse: true },
    ],
};

export default function FloatingHexagons() {
    const pathname = usePathname();

    // No renderizar en proyectos para no saturar
    if (pathname === '/projects') return null;

    // Si la ruta no está definida, usamos la posición del Home por defecto
    const currentPositions = POSITIONS[pathname] || POSITIONS['/'];

    return (
        <div className="fixed top-0 left-0 w-full h-svh pointer-events-none overflow-hidden z-0">
            {currentPositions.map((config: any, i: number) => (
                <div
                    key={i}
                    className="absolute hexagon-wrapper transition-all duration-1000 ease-in-out top-(--m-top) left-(--m-left) w-(--m-size) h-(--m-size) md:top-(--top) md:left-(--left) md:w-(--size) md:h-(--size)"
                    style={{
                        '--top': config.top,
                        '--left': config.left,
                        '--size': `${config.size}px`,
                        '--m-top': config.mTop || config.top,
                        '--m-left': config.mLeft || config.left,
                        '--m-size': config.mSize ? `${config.mSize}px` : `${config.size}px`,
                    } as React.CSSProperties}
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