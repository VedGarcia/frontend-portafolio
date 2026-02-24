# Portfolio Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Arquitectura de Datos (`lib` y `services`)

El proyecto utiliza una arquitectura modular y escalable para la comunicación con el backend (PayloadCMS o similar), dividiendo las responsabilidades entre utilidades (`lib`) y servicios de datos centralizados (`services`).

### Estructura de Carpetas

- **`src/services/`**: Contiene la lógica principal y centralizada de comunicación con la API.
  - `dataServices.ts`: Exporta un objeto `api` con métodos genéricos para interactuar con la base de datos (obtener colecciones, documentos individuales, etc.).
- **`src/lib/`**: Contiene utilidades, helpers y funciones de apoyo.
  - `serialize.tsx`: Convierte el formato de texto enriquecido (Rich Text JSON) devuelto por PayloadCMS directamente en componentes de React listos para renderizar.
  - `api.ts` / `payload.ts`: Funciones de fetch heredadas o específicas que envuelven llamadas a la API (Nota: La tendencia del proyecto es centralizar el consumo a través de `services/dataServices.ts`).

### ¿Cómo funciona la implementación?

La comunicación con la API se realiza a través de la API `fetch` nativa, aprovechando las ventajas de Next.js (como Incremental Static Regeneration o `next: { revalidate: 60 }` para tener un caché inteligente).

El núcleo de esta arquitectura se encuentra en **`src/services/dataServices.ts`**. Este archivo implementa una función interna `sendRequest` que se encarga de:
1. Construir la URL base dinámica usándo `NEXT_PUBLIC_API_URL`.
2. Parsear parámetros complejos (`depth`, `limit`, y operadores relacionales `where`) y convertirlos de objetos JavaScript a `URLSearchParams` legibles por PayloadCMS.
3. Ejecutar la petición, manejar errores y devolver la respuesta con el tipado Genérico (`<T>`).

Hacia el exterior, exporta un objeto `api` estandarizado:
- `api.getCollection<T>(slug, depth)`: Para listar documentos (ej. obtener todos los proyectos).
- `api.getBySlug<T>(collection, slug)`: Para obtener un documento único basándose en su campo `slug`.
- `api.getGlobal<T>(slug)`: Para consultar componentes globales de la aplicación (ej. configuraciones generales, perfil de usuario).

### ¿Cómo consumir las APIs (Uso en Componentes/Páginas)?

Para obtener datos desde cualquier componente del servidor (Server Component) en Next.js, debes importar el objeto `api` estandarizado desde `services/dataServices.ts` e invocar el método correspondiente pasando tu Interfaz de Typescript.

**Ejemplo: Obtener una lista de proyectos (`getCollection`)**

```tsx
import { api } from '@/services/dataServices';
// import { Project } from '@/types'; // Tu interfaz TypeScript

export default async function ProjectsPage() {
    // Obtenemos los proyectos con profundidad de población 1 (relaciones)
    const data = await api.getCollection<Project>('projects', 1);
    const projects = data.docs;

    return (
        <div>
            <h1>Mis Proyectos</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>{project.title}</li>
                ))}
            </ul>
        </div>
    );
}
```

**Ejemplo: Obtener un post específico utilizando su Slug (`getBySlug`)**

```tsx
import { api } from '@/services/dataServices';

export default async function SinglePostPage({ params }: { params: { slug: string } }) {
    // Obtenemos el post filtrando por el slug de la URL
    const post = await api.getBySlug<Post>('posts', params.slug);

    if (!post) {
        return <div>Post no encontrado</div>;
    }

    return (
        <article>
            <h1>{post.title}</h1>
            {/* Si el post tiene rich-text, puedes usar: serialize(post.content) */}
        </article>
    );
}
```

### ¿Cómo agregar nuevas funcionalidades?

Si el proyecto requiere nuevas formas de interactuar con el backend, debes seguir las convenciones de esta arquitectura para mantener el código limpio:

1. **Para nuevas consultas HTTP genéricas:**
   Modifica el archivo `src/services/dataServices.ts`. Si necesitas agregar peticiones `POST`, `PUT`, `DELETE`, o peticiones con paginación explícita, crea un nuevo método dentro del objeto `api` interno (o extiéndelo). Utiliza el tipado `<T>` para que el método siga siendo flexible.
   
2. **Para transformaciones de datos o helpers independientes:**
   Utiliza la carpeta `src/lib/`. Por ejemplo, si creas formateadores de fechas, validadores de formularios, o nuevas funciones que interactúan con APIs externas de terceros (fuera de tu PayloadCMS), crea un nuevo archivo en \`lib/\`.

3. **Renderizado de Texto Enriquecido:**
   Si añades nuevos bloques personalizados a tu CMS (por ejemplo, un bloque tipo "Galería de imágenes" o "Llamado a la acción" dentro del contenido), deberás actualizar el `switch (node.type)` dentro de `src/lib/serialize.tsx` para que React sepa qué componente renderizar cuando reciba ese nuevo tipo de nodo.

---

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying \`app/page.tsx\`. The page auto-updates as you edit the file.

This project uses [\`next/font\`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
