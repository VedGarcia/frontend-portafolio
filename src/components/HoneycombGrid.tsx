import React, { ReactNode } from 'react';

interface HoneycombGridProps {
    items: any[];
    renderItem: (item: any) => ReactNode;
}

export default function HoneycombGrid({ items, renderItem }: HoneycombGridProps) {
    return (
        <div className="w-full flex justify-center mt-12">
            <style>{`
                .honeycomb-container {
                    display: flex;
                    flex-wrap: wrap;
                    /* Valores base para Escritorio (3 columnas) */
                    --cols: 3;
                    --hex-w: 320px; 
                    --hex-h: 360px;
                    /* El ancho exacto para forzar las columnas y mantener huérfanos alineados */
                    width: calc((0.5 * var(--cols) + 0.5) * var(--hex-w));
                    padding-bottom: calc(0.75 * var(--hex-h));
                }

                .hex-wrapper {
                    position: relative;
                    width: var(--hex-w);
                    height: var(--hex-h);
                    margin-bottom: calc(-0.25 * var(--hex-h)); 
                    transition: transform 0.3s ease;
                }

                .hex-wrapper:hover {
                    z-index: 10;
                }

                /* Lógica Matemática de Panal para N ítems (Escritorio) */
                @media (min-width: 1024px) {
                    /* El primero de cada fila se alinea al inicio */
                    .hex-wrapper:nth-child(3n + 1) { margin-left: 0; }
                    /* Los demás se solapan a la izquierda para formar la matriz */
                    .hex-wrapper:not(:nth-child(3n + 1)) { margin-left: calc(-0.5 * var(--hex-w)); }
                    /* Las columnas pares bajan para entrelazarse */
                    .hex-wrapper:nth-child(3n + 2) { margin-top: calc(0.75 * var(--hex-h)); }
                }

                /* --- Tablet: 2 Columnas --- */
                @media (min-width: 768px) and (max-width: 1023px) {
                    .honeycomb-container { 
                        --cols: 2;
                        --hex-w: 260px; 
                        --hex-h: 292.5px; 
                    }
                    .hex-wrapper:nth-child(2n + 1) { margin-left: 0; }
                    .hex-wrapper:not(:nth-child(2n + 1)) { margin-left: calc(-0.5 * var(--hex-w)); }
                    .hex-wrapper:nth-child(2n + 2) { margin-top: calc(0.75 * var(--hex-h)); }
                }

                /* --- Móvil: 1 Columna (Apilados) --- */
                @media (max-width: 767px) {
                    .honeycomb-container {
                        --cols: 1;
                        --hex-w: 280px;
                        --hex-h: 315px;
                        flex-direction: column;
                        align-items: center;
                        /* En móvil el ancho puede ser 100% en vez de la fórmula matemática */
                        width: 100%;
                        padding-bottom: 2rem;
                    }
                    .hex-wrapper {
                        margin-left: 0 !important;
                        margin-top: 0 !important;
                        margin-bottom: 1.5rem !important; /* Espaciado normal */
                    }
                }
            `}</style>
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
