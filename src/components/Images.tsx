import Image from "next/image";

export default function Images({ src, alt, ...props }: any) {
    const fullUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${src.url}`;
    return (
        <Image
            src={fullUrl}
            alt={alt || 'Imagen del Blog de VEd'}
            width={src.width}
            height={src.height}
            {...props}
        />
    );
}