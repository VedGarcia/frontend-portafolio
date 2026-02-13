const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getPayload(collection: string) {
    const response = await fetch(`${SERVER_URL}/api/${collection}?depth=2`, {
        next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`Error al obtener datos de ${collection}`);

    return response.json();
}

export async function getGlobal(slug: string) {
    const response = await fetch(`${SERVER_URL}/api/globals/${slug}`, {
        next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`Error al obtener datos de ${slug}`);
    return response.json();
}