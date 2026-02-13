import { getGlobal } from "@/lib/api";

export default async function Home() {
    const profile = await getGlobal('profile');
    console.log(profile)
    return (
        <main className="min-h-screen bg-[#0a050f] text-white flex items-center px-10 relative overflow-hidden">
            {/* Fondo con Hexágonos (puedes usar SVGs o CSS absoluto) */}
            <div className="absolute top-10 left-50 opacity-30">
                {/* Aquí irían tus componentes de hexágonos según tu diseño */}
            </div>

            <div className="z-10">
                <h2 className="text-4xl font-light text-purple-300">El blog de</h2>
                <h1 className="text-9xl font-bold text-purple-700 tracking-tighter">
                    {profile.nickname}
                </h1>
            </div>

            {/* Barra lateral de navegación (Imagen 5) */}
            <nav className="fixed right-0 top-0 h-full w-16 bg-[#120a1a] flex flex-col items-center py-10 space-y-8 border-l border-purple-900/30">
                {/* Aquí pondrás tus iconos de redes sociales que vienen de profile.socialLinks */}
            </nav>
        </main>
    )
}