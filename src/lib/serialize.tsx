import React, { Fragment } from "react";

export const serialize = (nodes: any[]): React.ReactNode => {
    if (!nodes || !Array.isArray(nodes)) return null;

    return nodes.map((node, i) => {
        if (!node) return null;

        const content = node.text ?? node.value;

        if (content !== undefined && content !== null) {
            let text: React.ReactNode = String(content);

            if (node.bold || (node.format & 1)) text = <strong key={`b-${i}`}>{text}</strong>;
            if (node.italic || (node.format & 2)) text = <em key={`i-${i}`}>{text}</em>;
            if (node.underline || (node.format & 4)) text = <u key={`u-${i}`}>{text}</u>;

            return <Fragment key={i}>{text}</Fragment>;
        }

        switch (node.type) {
            case 'h1':
                return <h1 key={i} className="text-4xl font-bold my-4">{serialize(node.children)}</h1>;
            case 'h2':
                return <h2 key={i} className="text-2xl font-semibold my-3 text-purple-400">{serialize(node.children)}</h2>;
            case 'h3':
                return <h3 key={i} className="text-xl font-bold my-2">{serialize(node.children)}</h3>;
            case 'ul':
                return <ul key={i} className="list-disc ml-6 my-2">{serialize(node.children)}</ul>;
            case 'ol':
                return <ol key={i} className="list-decimal ml-6 my-2">{serialize(node.children)}</ol>;
            case 'li':
                return <li key={i} className="mb-1">{serialize(node.children)}</li>;
            case 'p':
            case 'paragraph':
                return <p key={i} className="mb-4 text-gray-300">{serialize(node.children)}</p>;
            case 'quote':
                return <blockquote key={i} className="border-l-4 border-purple-500 pl-4 italic">{serialize(node.children)}</blockquote>;
            default:
                if (node.children) {
                    return <Fragment key={i}>{serialize(node.children)}</Fragment>;
                }
                return null;
        }
    });
};