import { api } from '@/services/dataServices';
import ProjectHexagon from '@/components/ProjectHexagon';

export default async function ProjectsPage() {
    const projects = await api.getCollection('projects');

    return (
        <main className="min-h-screen p-10">
            <h1 className="mt-16 py-4 text-6xl font-bold text-violet-950 dark:text-violet-400 tracking-tighter drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(192,132,252,0.8)] transition-colors">Mis Proyectos</h1>

            {/* Contenedor Flex con envoltura y centrado */}
            <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
                {projects.docs.map((project: any, index: number) => (
                    <div
                        key={project.id}
                        // El "truco" del panal: los elementos pares o impares se desplazan
                        className={`transition-transform duration-500 ${index % 2 !== 0 ? 'mt-0 md:mt-32' : ''
                            }`}
                    >
                        <ProjectHexagon project={project} />
                    </div>
                ))}
            </div>
        </main>
    );
}