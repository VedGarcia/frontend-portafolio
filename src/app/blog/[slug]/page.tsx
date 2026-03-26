import { getPost } from "@/lib/api";
import { api } from "@/services/dataServices";
import { notFound } from "next/navigation";
import { serialize } from "@/lib/serialize";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();

    const allPostsData = await api.getCollection<any>('posts');
    const allPosts = allPostsData.docs || [];
    const currentIndex = allPosts.findIndex((p: any) => (p.slug || p.id) === slug);

    // In Payload, newer posts might be first, but previous/next are logical steps in the array.
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    const content = post.content?.root?.children
        ? serialize(post.content.root.children)
        : null;
    return (
        <article className="max-w-4xl mx-auto py-20 px-6 text-violet-950 dark:text-white pr-14 lg:pr-0">
            <Link href="/blog" className="fixed flex flex-col md:flex-row gap-2 md:top-28 top-16 md:left-28 right-4 font-light text-xl items-center justify-center text-violet-700 dark:text-violet-300  hover:text-violet-600 dark:hover:text-violet-100 transition-all mx-4 uppercase">
                <FaArrowLeft className="w-5 h-5 shrink-0" />
                <span className="hidden md:block">Artículos</span>
            </Link>
            <header className="my-10">
                <span className="text-violet-600 dark:text-purple-400 font-mono">{post.category?.name}</span>
                <h1 className="text-5xl font-bold mt-2">{post.title}</h1>
            </header>

            <div className="prose prose-invert prose-purple max-w-none">
                <div className="mt-8">
                    {content}
                </div>
            </div>

            <div className="mt-20 pt-10 border-t border-violet-200 dark:border-violet-900/50">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {prevPost ? (
                        <Link href={`/blog/${prevPost.slug || prevPost.id}`} className="group flex items-center gap-4 text-violet-800 dark:text-violet-300 hover:text-violet-600 dark:hover:text-violet-100 transition-colors flex-1 w-full md:w-auto p-4 rounded-xl border border-violet-50 dark:border-violet-900/40">
                            <span className="p-3 rounded-full bg-violet-100 dark:bg-violet-900/50 group-hover:bg-violet-200 dark:group-hover:bg-violet-800 transition-colors">
                                <FaArrowLeft className="w-5 h-5 shrink-0" />
                            </span>
                            <div className="flex flex-col items-start min-w-0">
                                <span className="text-xs font-medium opacity-70 uppercase tracking-wider mb-1">Anterior</span>
                                <span className="font-semibold line-clamp-2 w-full text-left leading-tight">{prevPost.title}</span>
                            </div>
                        </Link>
                    ) : <div className="flex-1 hidden md:block" />}

                    {nextPost ? (
                        <Link href={`/blog/${nextPost.slug || nextPost.id}`} className="group flex items-center justify-end gap-4 text-violet-800 dark:text-violet-300 hover:text-violet-600 dark:hover:text-violet-100 transition-colors flex-1 w-full md:w-auto p-4 rounded-xl border border-violet-50 dark:border-violet-900/40 text-right">
                            <div className="flex flex-col items-end min-w-0">
                                <span className="text-xs font-medium opacity-70 uppercase tracking-wider mb-1">Siguiente</span>
                                <span className="font-semibold line-clamp-2 w-full text-right leading-tight">{nextPost.title}</span>
                            </div>
                            <span className="p-3 rounded-full bg-violet-100 dark:bg-violet-900/50 group-hover:bg-violet-200 dark:group-hover:bg-violet-800 transition-colors">
                                <FaArrowRight className="w-5 h-5 shrink-0" />
                            </span>
                        </Link>
                    ) : <div className="flex-1 hidden md:block" />}
                </div>
            </div>
        </article>
    );
}