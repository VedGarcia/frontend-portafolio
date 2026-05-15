import { api } from '@/services/dataServices';
import ProjectHexagon from '@/components/ProjectHexagon';
import HoneycombGrid from '@/components/HoneycombGrid';

export default async function ProjectsPage() {
    const projects = await api.getCollection('projects');

    return (
        <main className="min-h-svh p-10 overflow-hidden">
            <h1 className="mt-16 py-4 text-4xl md:text-6xl font-bold text-violet-950 dark:text-violet-400 tracking-tighter drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(192,132,252,0.8)] transition-colors text-center">
                Mis Proyectos
            </h1>

            {!projects || projects.docs.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center mt-20 px-6">
                    <h2 className="text-2xl md:text-4xl font-semibold text-violet-900 dark:text-violet-400 drop-shadow-sm mb-4">
                        Aún no hay proyectos en este espacio
                    </h2>
                    <p className="text-violet-900/60 dark:text-violet-400/60 text-lg">
                        Vuelve más tarde o espera a que se cargue la información.
                    </p>
                </div>
            ) : (
                <HoneycombGrid 
                    items={projects.docs} 
                    renderItem={(project: any) => <ProjectHexagon project={project} />} 
                />
            )}
        </main>
    );
}