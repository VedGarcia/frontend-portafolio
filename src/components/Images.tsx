import Image from "next/image";

export default function Images({ src, alt, ...props }: any) {
    if (!src || !src.url) return null;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
    const fullUrl = src.url.startsWith('http') ? src.url : `${baseUrl}${src.url}`;

    return (
        <Image
            src={fullUrl}
            alt={alt || 'Imagen del Blog de VEd'}
            width={src.width || 800}
            height={src.height || 800}
            unoptimized={true}
            {...props}
        />
    );
}