import { getPost } from "@/lib/api";
import { notFound } from "next/navigation";
import { serialize } from "@/lib/serialize";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();
    const content = post.content?.root?.children
        ? serialize(post.content.root.children)
        : null;
    return (
        <article className="max-w-4xl mx-auto py-20 px-6 text-white">
            <header className="mb-10">
                <span className="text-purple-400 font-mono">{post.category?.name}</span>
                <h1 className="text-5xl font-bold mt-2">{post.title}</h1>
            </header>

            <div className="prose prose-invert prose-purple max-w-none">
                <div className="mt-8">
                    {content}
                </div>
            </div>
        </article>
    );
}