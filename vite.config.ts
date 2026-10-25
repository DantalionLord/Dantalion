import { fileURLToPath } from "node:url"
import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const root = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  base: "/Dantalion/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, "index.html"),
        precios: resolve(root, "precios.html"),
        habilidades: resolve(root, "habilidades.html"),
        legal: resolve(root, "legal.html"),
        privacidad: resolve(root, "privacidad.html"),
      },
    },
  },
})
