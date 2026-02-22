import { api } from '@/services/dataServices';
import ProjectHexagon from '@/components/ProjectHexagon';

export default async function ProjectsPage() {
    const projects = await api.getCollection('projects');

    return (
        <main className="min-h-screen py-20 px-10">
            <h1 className="text-5xl font-bold text-purple-700 mb-16 text-center">Mis Proyectos</h1>

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