import { api } from "@/services/dataServices";
import Link from "next/link";

export default async function BlogPage() {
    const data = await api.getCollection('posts');
    const posts = data.docs;
    return (
        <div className="min-h-screen text-white p-10 pr-14 lg:pr-0">
            <h1 className="mt-16 py-4 text-4xl md:text-6xl font-bold text-violet-950 dark:text-violet-400 tracking-tighter drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(192,132,252,0.8)] transition-colors">Artículos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                    <Link key={post.id} href={`/blog/${post.slug || post.id}`}>
                        <article className="border border-violet-900/30 bg-white  dark:bg-[#120a1a] p-6 rounded-lg hover:border-violet-500 hover:bg-violet-500/10 hover:scale-105 hover:shadow-lg transition-all duration-200">
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
        </div>
    );
}