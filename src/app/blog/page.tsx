import { api } from "@/services/dataServices";
import Link from "next/link";

export default async function BlogPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams;
    const q = (searchParams?.q as string | undefined)?.toLowerCase();

    const data = await api.getCollection('posts');
    let posts = data.docs;

    // Filtramos los artículos si existe una búsqueda
    if (q) {
        posts = posts.filter((post: any) => 
            post.title?.toLowerCase().includes(q) || 
            post.category?.name?.toLowerCase().includes(q)
        );
    }

    return (
        <div className="min-h-svh text-white p-10 pr-14 lg:pr-0">
            <h1 className="mt-16 py-4 text-4xl md:text-6xl font-bold text-violet-950 dark:text-violet-400 tracking-tighter drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(192,132,252,0.8)] transition-colors">Artículos</h1>

            {posts.length === 0 ? (
                <div className="mt-20 flex flex-col items-center justify-center text-center">
                    <p className="text-2xl font-semibold text-violet-900 dark:text-violet-400 drop-shadow-sm mb-2">No se encontraron artículos.</p>
                    <p className="text-violet-900/60 dark:text-violet-400/60">No hay resultados para la búsqueda "{q}". Intenta usar otras palabras clave.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: any) => (
                        <Link key={post.id} href={`/blog/${post.slug || post.id}`}>
                            <article className="h-full border border-violet-900/30 bg-white  dark:bg-[#120a1a] p-6 rounded-lg hover:border-violet-500 hover:bg-violet-500/10 hover:scale-105 hover:shadow-lg transition-all duration-200">
                                <span className="text-xs font-mono text-violet-900 dark:text-violet-400 uppercase tracking-widest">
                                    {post.category?.name}
                                </span>
                                <h2 className="text-2xl font-semibold mt-2 text-violet-900 dark:text-violet-400">{post.title}</h2>
                                <p className="text-violet-900/50 dark:text-violet-400/50 mt-4 line-clamp-3">
                                    Haga clic para leer más...
                                </p>
                            </article>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}