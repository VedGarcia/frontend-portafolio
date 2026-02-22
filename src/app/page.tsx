import { getGlobal } from "@/lib/api";
import Images from "@/components/Images";

export default async function Home() {
    const profile = await getGlobal('profile');
    console.log(profile)
    return (
        <main className="min-h-screen  text-white flex flex-col items-center px-10 relative overflow-hidden">
            <section className="w-full min-h-dvh flex flex-col justify-center">
                {/* Fondo con Hexágonos (puedes usar SVGs o CSS absoluto) */}

                <div className="z-10">
                    <h2 className="text-4xl font-light text-purple-300">El blog de</h2>
                    <h1 className="text-9xl font-bold text-purple-700 tracking-tighter">
                        {profile.nickname}
                    </h1>
                </div>
            </section>
            <section className="w-full h-dvh gap-8 flex flex-col">
                <div className="flex flex-col gap-4">
                    {profile?.profilePicture && (
                        <Images
                            src={profile.profilePicture}
                            alt={profile.profilePicture.alt || 'Foto de perfil'}
                            width={profile.profilePicture.width || 400}
                        />
                    )}
                </div>
                <h3 className="py-4 text-6xl font-bold text-purple-700 tracking-tighter">Sobre mí</h3>
                <p className="font-light text-purple-300">Hola, soy <span className="font-bold text-purple-600">{profile.name}</span> y para resumir estoy organizando mi formación porque me gusta programar.</p>
                <p className="font-light text-purple-300">{profile.bio}</p>
            </section>
        </main>
    )
}