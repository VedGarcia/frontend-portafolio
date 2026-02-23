import { getGlobal } from "@/lib/api";
import Images from "@/components/Images";

export default async function Home() {
    const profile = await getGlobal('profile');
    console.log(profile)
    return (
        <main className="min-h-screen flex flex-col items-center px-10 relative overflow-x-hidden transition-colors duration-500">
            <section className="w-full min-h-dvh flex flex-col justify-center items-end text-right">
                <div className="z-10">
                    <h2 className="text-4xl font-light text-purple-900 dark:text-purple-300 drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(192,132,252,0.8)] transition-colors">
                        El blog de
                    </h2>
                    <h1 className="text-9xl font-bold text-purple-950 dark:text-purple-400 tracking-tighter drop-shadow-xl dark:drop-shadow-[0_0_20px_rgba(192,132,252,1)] transition-colors">
                        {profile.nickname}
                    </h1>
                </div>
            </section>
            <section className="w-full h-dvh gap-8 flex flex-col z-10">
                <div className="flex flex-col gap-4">
                    {profile?.profilePicture && (
                        <Images
                            src={profile.profilePicture}
                            alt={profile.profilePicture.alt || 'Foto de perfil'}
                            width={profile.profilePicture.width || 400}
                        />
                    )}
                </div>
                <h3 className="py-4 text-6xl font-bold text-purple-950 dark:text-purple-400 tracking-tighter drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(192,132,252,0.8)] transition-colors">
                    Sobre mí
                </h3>
                <p className="font-light text-purple-900 dark:text-purple-300 text-xl max-w-2xl p-6 transition-colors">
                    Hola, soy <span className="font-bold text-purple-700 dark:text-purple-400 dark:drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]">{profile.name}</span> y para resumir estoy organizando mi formación porque me gusta programar.
                </p>
                <p className="font-light text-purple-900 dark:text-purple-300 text-xl max-w-2xl p-6 transition-colors">
                    {profile.bio}
                </p>
            </section>
        </main>
    )
}