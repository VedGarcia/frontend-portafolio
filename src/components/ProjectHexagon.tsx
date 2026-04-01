import Link from 'next/link';
import Images from './Images';

interface ProjectProps {
    project: {
        title: string;
        image: any;
        link: string;
        description?: string;
    };
}

export default function ProjectHexagon({ project }: ProjectProps) {
    return (
        <div className="relative w-[85vw] max-w-[280px] sm:max-w-[320px] md:w-[260px] lg:w-[320px] aspect-[8/9] group">
            <div
                className="w-full h-full bg-violet-900/20 overflow-hidden transition-all duration-500 md:group-hover:bg-violet-800/40"
                style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}
            >
                <div className="absolute inset-0 z-0 opacity-80 md:opacity-60 md:group-hover:opacity-100 transition-opacity duration-700">
                    <Images
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transform transition-transform duration-700 md:group-hover:scale-110"
                    />
                </div>

                {/* Capa de contenido: Visible por defecto en móvil, hover en escritorio */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 sm:p-6 text-center 
                                bg-black/60 md:bg-black/40 md:opacity-0 md:group-hover:opacity-100 md:group-hover:bg-black/60 
                                transition-all duration-500">
                    <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2 
                                   transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                        {project.title}
                    </h3>
                    
                    {project.description && (
                         <p className="text-xs sm:text-sm text-gray-200 line-clamp-3 mb-4 
                                       md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {project.description}
                        </p>
                    )}
                    
                    <Link
                        href={project.link || '#'}
                        target="_blank"
                        className="mt-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border border-violet-400 
                                   text-violet-100 sm:text-violet-300 font-medium text-xs sm:text-sm 
                                   bg-violet-600/40 sm:bg-transparent
                                   hover:bg-violet-500 hover:text-white hover:border-violet-500 
                                   transition-all duration-300 shadow-[0_0_10px_rgba(167,139,250,0.2)] 
                                   hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                    >
                        VER PROYECTO
                    </Link>
                </div>
            </div>
        </div>
    );
}