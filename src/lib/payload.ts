const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Interfaz para opciones de consulta (Senior tip: flexibilidad)
interface QueryOptions {
    depth?: number;
    select?: Record<string, boolean>; // Para elegir campos específicos
    where?: Record<string, any>;
    revalidate?: number;
}

async function sendRequest<T>(endpoint: string, options: QueryOptions = {}): Promise<T> {
    const { depth = 1, select, where, revalidate = 60 } = options;

    // Construimos la URL con parámetros dinámicos
    const url = new URL(`${SERVER_URL}/api/${endpoint}`);

    if (depth) url.searchParams.append('depth', depth.toString());

    // Payload permite filtrar campos para no traer todo el JSON
    // Ejemplo: select: { title: true } -> solo trae el título
    if (select) {
        // Aquí transformarías el objeto select a formato de query string si tu versión de Payload lo soporta
    }

    const response = await fetch(url.toString(), {
        next: { revalidate },
    });

    if (!response.ok) {
        throw new Error(`[API Error]: Falló la petición a ${endpoint}`);
    }

    return response.json();
}