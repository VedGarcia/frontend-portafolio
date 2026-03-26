import { getGlobal } from "@/lib/api";
import Images from "@/components/Images";

export default async function Home() {
    const profile = await getGlobal('profile');

    return (
        <main className="w-full flex justify-center pb-20 relative transition-colors duration-500 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center">

                {/* Hero / Título */}
                <section className="w-full min-h-dvh flex flex-col justify-center items-center lg:items-end text-center lg:text-right mr-16 px-6 md:px-10 z-10">
                    <div className="flex flex-col items-end justify-end w-full h-full pb-20">
                        <h2 className="text-4xl md:text-5xl font-light text-purple-900 dark:text-purple-300 drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(192,132,252,0.8)] transition-colors mb-2">
                            El blog de
                        </h2>
                        <h1 className="text-5xl md:text-9xl font-bold text-purple-950 dark:text-purple-400 tracking-tighter drop-shadow-xl dark:drop-shadow-[0_0_20px_rgba(192,132,252,1)] transition-colors">
                            {profile.nickname}
                        </h1>
                    </div>
                </section>

                {/* Sobre Mi */}
                <section className="w-full min-h-dvh flex flex-col items-center justify-center text-center gap-6 px-6 md:px-10 z-10 pt-20 lg:pt-0 pr-14 lg:pr-0">
                    {profile?.profilePicture && (
                        <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-4xl">
                            <Images
                                src={profile.profilePicture}
                                alt={profile.profilePicture.alt || 'Foto de perfil'}
                                width={profile.profilePicture.width || 400}
                                height={profile.profilePicture.height || 400}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="flex flex-col items-start md:items-center text-start md:text-center max-w-3xl">
                        <h3 className="py-2 text-4xl md:text-6xl font-bold text-purple-950 dark:text-purple-400 tracking-tighter drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(192,132,252,0.8)] transition-colors">
                            Sobre mí
                        </h3>
                        <p className="font-light text-lg md:text-xl py-2 transition-colors">
                            Hola, soy <span className="font-bold text-purple-700 dark:text-purple-400 dark:drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]">{profile.name}</span> y para resumir éste es mi blog, les comento un poco de mi:
                        </p>
                        <p className="font-light text-lg md:text-xl py-2 transition-colors">
                            {profile.bio}
                        </p>
                        <p className="font-light text-lg md:text-xl py-2 transition-colors">
                            Eso es lo que dice la IA de mí, sin embargo me gustaría que navegues un poco y veas que más hay de interesante en el blog. Espero que disfruten de mi blog y que encuentren información valiosa y útil para sus proyectos.
                        </p>
                    </div>
                </section>

            </div>
        </main>
    )
}