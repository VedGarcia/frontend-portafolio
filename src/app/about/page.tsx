import { getGlobal } from "@/lib/api";
import Images from "@/components/Images";
import { serialize } from "@/lib/serialize";

export default async function AboutPage() {
    const profile = await getGlobal('profile');
    const content = profile?.all_bio?.root?.children
        ? serialize(profile.all_bio.root.children)
        : null;
    return (
        <main className="min-h-svh flex flex-col items-start md:items-center px-10 overflow-x-hidden pr-14 md:pr-20 lg:pr-0">
            <div className="w-full h-20 sticky top-20">
                <h3 className="py-4 text-4xl md:text-6xl font-bold text-violet-950 dark:text-violet-400 tracking-tighter drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(192,132,252,0.8)] transition-colors">
                    Sobre mí
                </h3>
            </div>

            {!profile || !profile.name ? (
                <div className="flex flex-col items-center justify-center text-center mt-32 w-full px-6">
                    <h2 className="text-2xl md:text-4xl font-semibold text-violet-900 dark:text-violet-400 drop-shadow-sm mb-4">
                        Aún no hay información en este espacio
                    </h2>
                    <p className="text-violet-900/60 dark:text-violet-400/60 text-lg">
                        Parece que los datos del perfil aún no están disponibles.
                    </p>
                </div>
            ) : (
                <section className="max-w-5xl flex flex-col z-10 mt-32 w-full">
                    <p className="font-light text-violet-900 dark:text-violet-300 text-md max-w-3xl transition-colors">
                        Hola, soy <span className="font-bold text-violet-800 dark:text-violet-400 dark:drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]">{profile.name}</span> hablemos un poco de mi historia profesional.
                    </p>
                    <div className="mt-8  text-violet-900 dark:text-violet-300 transition-colors">
                        {content}
                    </div>
                </section>
            )}
        </main>
    );
}