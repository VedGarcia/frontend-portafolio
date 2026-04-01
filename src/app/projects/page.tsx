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

            <HoneycombGrid 
                items={projects.docs} 
                renderItem={(project: any) => <ProjectHexagon project={project} />} 
            />
        </main>
    );
}