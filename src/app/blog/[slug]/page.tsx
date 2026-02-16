import { getPayload } from "@/lib/api";
import { notFound } from "next/navigation";
import { serialize } from "@/lib/serialize";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?where[slug][equals]=${params.slug}`;
    const res = await fetch(url);
    const data = await res.json();
    const post = data.docs[0];
    if (!post) notFound();
    return (
        <article className="max-w-4xl mx-auto py-20 px-6 text-white">
            <header className="mb-10">
                <span className="text-purple-400 font-mono">{post.category?.name}</span>
                <h1 className="text-5xl font-bold mt-2">{post.title}</h1>
            </header>

            <div className="prose prose-invert prose-purple max-w-none">
                <div className="mt-8">
                    {serialize(post.content.root.children)}
                </div>
            </div>
        </article>
    );
}