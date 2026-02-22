import { api } from "@/services/dataServices";
import Link from "next/link";

export default async function BlogPage() {
    const data = await api.getCollection('posts');
    const posts = data.docs;
    return (
        <div className="min-h-screen bg-[#0a050f] text-white p-10">
            <h1 className="text-4xl font-bold text-purple-500 mb-10">Artículos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                    <Link key={post.id} href={`/blog/${post.slug || post.id}`}>
                        <article className="border border-purple-900/30 bg-[#120a1a] p-6 rounded-lg hover:border-purple-500 transition-colors">
                            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                                {post.category?.name}
                            </span>
                            <h2 className="text-2xl font-semibold mt-2">{post.title}</h2>
                            <p className="text-gray-400 mt-4 line-clamp-3">
                                Haga clic para leer más sobre este tema...
                            </p>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}