const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface QueryParams {
    depth?: number;
    where?: Record<string, any>;
    limit?: number;
    [key: string]: any;
}

/**
 * Función genérica para hacer peticiones fetch a la API (PayloadCMS)
 */
async function sendRequest<T>(endpoint: string, params?: QueryParams): Promise<T> {
    let url = `${SERVER_URL}/api/${endpoint}`;

    if (params) {
        const queryParams = new URLSearchParams();
        if (params.depth) queryParams.append('depth', String(params.depth));
        if (params.limit) queryParams.append('limit', String(params.limit));

        if (params.where) {
            for (const key of Object.keys(params.where)) {
                for (const operator of Object.keys(params.where[key])) {
                    queryParams.append(`where[${key}][${operator}]`, params.where[key][operator]);
                }
            }
        }

        const queryString = queryParams.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
    }

    const response = await fetch(url, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error(`Error en la petición a ${endpoint}: ${response.statusText}`);
    }

    return response.json();
}

export const api = {
    // Obtener una lista (Proyectos, Posts, etc)
    getCollection: async <T>(slug: string, depth = 1) => {
        const data = await sendRequest<{ docs: T[] }>(slug, { depth });
        return data;
    },

    // Obtener por campo único (Slug)
    getBySlug: async <T>(collection: string, slug: string) => {
        const data = await sendRequest<{ docs: T[] }>(collection, {
            where: { slug: { equals: slug } },
            depth: 2 // Aquí sí podrías necesitar más profundidad para el contenido
        });
        return data.docs?.[0] || null;
    },

    // Obtener Globales (Perfil)
    getGlobal: async <T>(slug: string) => {
        return sendRequest<T>(`globals/${slug}`);
    }
};