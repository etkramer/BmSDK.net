import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  // Served from GitHub Pages on the custom domain bmsdk.dev (CNAME in public/).
  site: 'https://bmsdk.dev',
  integrations: [react()],
  vite: {
    ssr: {
      // lucide-react ships CommonJS; let Vite bundle it so named icon
      // exports resolve during static rendering.
      noExternal: ['lucide-react'],
    },
  },
})
