import { Fragment } from "react";
import escapeHTML from "escape-html";

export const serialize = (nodes: any[]) => {
    return nodes.map((node, i) => {
        if (!node) return null;

        if (node.type === 'text') {
            let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.value) }} />;
            if (node.bold) text = <strong key={i}>{text}</strong>;
            if (node.italic) text = <em key={i}>{text}</em>;
            return <Fragment key={i}>{text}</Fragment>;
        }

        switch (node.type) {
            case 'h1': return <h1 key={i} className="text-4xl font-bold my-4">{serialize(node.children)}</h1>;
            case 'h2': return <h2 key={i} className="text-2xl font-semibold my-3 text-purple-400">{serialize(node.children)}</h2>;
            case 'ul': return <ul key={i} className="list-disc ml-6">{serialize(node.children)}</ul>;
            case 'li': return <li key={i}>{serialize(node.children)}</li>;
            default: return <p key={i} className="mb-4 text-gray-300">{serialize(node.children)}</p>;
        }
    })
}