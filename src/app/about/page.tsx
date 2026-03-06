import { getGlobal } from "@/lib/api";
import Images from "@/components/Images";
import { serialize } from "@/lib/serialize";

export default async function AboutPage() {
    const profile = await getGlobal('profile');
    const content = profile?.all_bio?.root?.children
        ? serialize(profile.all_bio.root.children)
        : null;
    return (
        <main className="min-h-screen flex flex-col items-center px-10 relative overflow-x-hidden transition-colors duration-500">
            <section className="w-full h-dvh gap-8 flex flex-col z-10">
                <div className="flex flex-col gap-4 items-end">
                    {profile?.profilePicture && (
                        <Images
                            src={profile.profilePicture}
                            alt={profile.profilePicture.alt || 'Foto de perfil'}
                            width={profile.profilePicture.width || 400}
                        />
                    )}
                </div>
                <h3 className="mt-16 py-4 text-6xl font-bold text-purple-950 dark:text-purple-400 tracking-tighter drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(192,132,252,0.8)] transition-colors">
                    Sobre mí
                </h3>
                <p className="font-light text-purple-900 dark:text-purple-300 text-xl max-w-2xl transition-colors">
                    Hola, soy <span className="font-bold text-purple-700 dark:text-purple-400 dark:drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]">{profile.name}</span> y te contaré porqué me gusta programar.
                </p>
                <div className="mt-8">
                    {content}
                </div>
            </section>
        </main>
    );
}