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
        <div className="relative w-64 h-72 group">
            <div
                className="w-full h-full bg-purple-900/20 overflow-hidden transition-all duration-500 group-hover:bg-purple-600/40"
                style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}
            >
                <div className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    <Images
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-black/40 group-hover:bg-transparent transition-colors">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">{project.title}</h3>
                    <Link
                        href={project.link || '#'}
                        target="_blank"
                        className="mt-4 px-4 py-1 border border-purple-400 text-purple-400 text-sm hover:bg-purple-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                        VER PROYECTO
                    </Link>
                </div>
            </div>
        </div>
    );
}