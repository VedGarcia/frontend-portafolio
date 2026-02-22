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

export async function getPost(slug: string) {
    const response = await fetch(`${SERVER_URL}/api/posts?where[slug][equals]=${slug}`, {
        next: { revalidate: 160 },
    });
    if (!response.ok) throw new Error(`Error al obtener datos de ${slug}`);
    const data = await response.json();
    if (data.docs && data.docs.length > 0) {
        return data.docs[0];
    }
    return null;
}

export async function getProjects() {
    const response = await fetch(`${SERVER_URL}/api/projects?depth=2`, {
        next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`Error al obtener datos de projects`);
    return response.json();
}