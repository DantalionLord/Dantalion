# Dantalion

Sitio personal construido con React, TypeScript, Vite, Tailwind CSS v4 y componentes con estructura shadcn/ui.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

La compilación estática se genera en `dist/`. El servidor de producción debe redirigir las rutas de la aplicación (`/tarifas`, `/competencias`, `/terminos` y `/politica-de-privacidad`) a `index.html` para que React Router pueda resolverlas. Los antiguos enlaces `.html` se mantienen como páginas de redirección.

## Componentes

- `src/components/ui/`: componentes de interfaz, como el Dock de navegación.
- `src/lib/utils.ts`: función `cn` compartida por los componentes.
- `src/index.css`: Tailwind, variables de tema y estilos globales.
- `components.json`: rutas y opciones que utiliza shadcn CLI.

El alias `@/` apunta a `src/`; por eso la ubicación configurada para el componente es `src/components/ui/dock-two.tsx`. Mantener `ui` en esa ruta permite que shadcn CLI encuentre y genere componentes en el lugar esperado y evita duplicar componentes compartidos.

Para añadir componentes shadcn/ui:

```bash
npx shadcn@latest add button
```
