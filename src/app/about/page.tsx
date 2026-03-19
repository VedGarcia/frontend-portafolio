import { getGlobal } from "@/lib/api";
import Images from "@/components/Images";
import { serialize } from "@/lib/serialize";

export default async function AboutPage() {
    const profile = await getGlobal('profile');
    const content = profile?.all_bio?.root?.children
        ? serialize(profile.all_bio.root.children)
        : null;
    return (
        <main className="min-h-screen flex flex-col items-center px-10 overflow-x-hidden">
            <div className="w-full h-20 sticky top-20">

                <h3 className="py-4 text-8xl font-bold text-purple-950 dark:text-purple-400 tracking-tighter drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(192,132,252,0.8)] transition-colors">
                    Sobre mí
                </h3>
            </div>
            <section className="max-w-5xl flex flex-col z-10 mt-32">
                <p className="font-light text-purple-900 dark:text-purple-300 text-md max-w-3xl transition-colors">
                    Hola, soy <span className="font-bold text-violet-800 dark:text-violet-400 dark:drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]">{profile.name}</span> hablemos un poco de mi historia profesional.
                </p>
                <div className="mt-8  text-purple-900 dark:text-purple-300 transition-colors">
                    {content}
                </div>
            </section>
        </main>
    );
}