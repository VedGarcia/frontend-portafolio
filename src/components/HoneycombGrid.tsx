import React, { ReactNode } from 'react';

interface HoneycombGridProps {
    items: any[];
    renderItem: (item: any) => ReactNode;
}

const generateHoneycombCSS = () => {
    // Definimos el CSS base
    let css = `
        .honeycomb-container {
            display: flex;
            flex-wrap: wrap;
            /* Tamaño base más pequeño para permitir que entren más hexágonos */
            --hex-w: 240px; 
            --hex-h: 270px;
        }
        .hex-wrapper {
            position: relative;
            width: var(--hex-w);
            height: var(--hex-h);
            transition: transform 0.3s ease;
        }
        .hex-wrapper:hover {
            z-index: 10;
        }
    `;

    // Máximo 20 columnas para soportar pantallas ultra-anchas.
    const maxCols = 20;

    for (let cols = 1; cols <= maxCols; cols++) {
        // Cálculo del ancho interno necesario para alojar 'cols' columnas
        // Formula: (0.5 * cols + 0.5) * w
        // Para w = 240: (0.5 * cols + 0.5) * 240 = 120 * cols + 120
        const innerW = 120 * cols + 120;
        
        // Sumamos 100px por márgenes (ej. p-10 del main) y seguridad
        const minW = cols === 1 ? 0 : innerW + 100; 

        // Para el máximo de esta media query, evaluamos el minW de la siguiente columna
        const nextInnerW = 120 * (cols + 1) + 120;
        const maxW = cols === maxCols ? null : (nextInnerW + 100 - 1);

        const mediaQuery = maxW 
            ? `@media (min-width: ${minW}px) and (max-width: ${maxW}px)`
            : `@media (min-width: ${minW}px)`;

        // Columna única: vista móvil clásica apilada
        if (cols === 1) {
            css += `
                ${mediaQuery} {
                    .honeycomb-container {
                        --cols: 1;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        padding-bottom: 2rem;
                        /* En móvil se ven mejor un poco más grandes */
                        --hex-w: 280px; 
                        --hex-h: 315px;
                    }
                    .hex-wrapper {
                        margin-left: 0;
                        margin-top: 0;
                        margin-bottom: 1.5rem;
                    }
                }
            `;
        } else {
            // Lógica de columnas de matriz panal.
            // Los elementos dentro de las columnas PARES descienden para entrelazarse.
            const evenColsSelectors = [];
            for (let c = 2; c <= cols; c += 2) {
                evenColsSelectors.push(`.hex-wrapper:nth-child(${cols}n + ${c})`);
            }

            css += `
                ${mediaQuery} {
                    .honeycomb-container {
                        --cols: ${cols};
                        flex-direction: row;
                        align-items: flex-start;
                        /* El ancho exacto para forzar las columnas */
                        width: calc((0.5 * var(--cols) + 0.5) * var(--hex-w));
                        padding-bottom: calc(0.75 * var(--hex-h));
                    }
                    .hex-wrapper {
                        margin-bottom: calc(-0.25 * var(--hex-h));
                        margin-top: 0; /* Reset */
                    }
                    /* Primer elemento de cara fila (columnas con índice 1) */
                    .hex-wrapper:nth-child(${cols}n + 1) { margin-left: 0; }
                    
                    /* Demás elementos se solapan a la izquierda */
                    .hex-wrapper:not(:nth-child(${cols}n + 1)) { margin-left: calc(-0.5 * var(--hex-w)); }
                    
                    /* Elementos en columnas pares bajan para entrelazamiento horizontal */
                    ${evenColsSelectors.length > 0 ? `
                        ${evenColsSelectors.join(', ')} {
                            margin-top: calc(0.75 * var(--hex-h));
                        }
                    ` : ''}
                }
            `;
        }
    }

    return css;
};

export default function HoneycombGrid({ items, renderItem }: HoneycombGridProps) {
    return (
        <div className="w-full flex justify-center mt-12">
            <style>{generateHoneycombCSS()}</style>
            <div className="honeycomb-container">
                {items.map((item, index) => (
                    // React usa el item.id si existe, si no, usa el index.
                    <div key={item.id || index} className="hex-wrapper">
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        </div>
    );
}
