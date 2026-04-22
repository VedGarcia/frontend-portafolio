const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getPayload(collection: string) {
    try {
        const response = await fetch(`${SERVER_URL}/api/${collection}?depth=2`, {
            next: { revalidate: 60 },
        });
        if (!response.ok) throw new Error(`Error al obtener datos de ${collection}`);
        return await response.json();
    } catch (error) {
        console.warn(`[Build Warning] Could not fetch ${collection}, using fallback data.`);
        return { docs: [] };
    }
}

export async function getGlobal(slug: string) {
    try {
        const response = await fetch(`${SERVER_URL}/api/globals/${slug}`, {
            next: { revalidate: 60 },
        });
        if (!response.ok) throw new Error(`Error al obtener datos de ${slug}`);
        return await response.json();
    } catch (error) {
        console.warn(`[Build Warning] Could not fetch global ${slug}, using fallback data.`);
        return { socialLinks: {} };
    }
}

export async function getPost(slug: string) {
    try {
        const response = await fetch(`${SERVER_URL}/api/posts?where[slug][equals]=${slug}`, {
            next: { revalidate: 160 },
        });
        if (!response.ok) throw new Error(`Error al obtener datos de ${slug}`);
        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
            return data.docs[0];
        }
        return null;
    } catch (error) {
        console.warn(`[Build Warning] Could not fetch post ${slug}, using fallback data.`);
        return null;
    }
}

export async function getProjects() {
    try {
        const response = await fetch(`${SERVER_URL}/api/projects?depth=2`, {
            next: { revalidate: 60 },
        });
        if (!response.ok) throw new Error(`Error al obtener datos de projects`);
        return await response.json();
    } catch (error) {
        console.warn(`[Build Warning] Could not fetch projects, using fallback data.`);
        return { docs: [] };
    }
}