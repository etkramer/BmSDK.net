import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  // Served from GitHub Pages on the custom domain bmsdk.dev (CNAME in public/).
  site: 'https://bmsdk.dev',
  integrations: [
    // Docs live under /docs/ (content in src/content/docs/docs/). The custom
    // marketing homepage at src/pages/index.astro keeps ownership of /.
    starlight({
      title: 'BmSDK',
      description:
        'Documentation for BmSDK, a C#-based script hook/modding SDK for Batman: Arkham City and Arkham Knight.',
      logo: { src: './src/assets/logo.svg', alt: 'BmSDK' },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/starlight-theme.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Team-BmSDK/BmSDK-AC' }],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'docs' },
            { label: 'Creating your first mod', slug: 'docs/getting-started/first-mod' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Redirecting functions', slug: 'docs/guides/redirecting-functions' },
            { label: 'Script components', slug: 'docs/guides/script-components' },
          ],
        },
        {
          label: 'Contributing',
          items: [{ label: 'Building from source', slug: 'docs/contributing/building' }],
        },
      ],
    }),
    react(),
  ],
  vite: {
    ssr: {
      // lucide-react ships CommonJS; let Vite bundle it so named icon
      // exports resolve during static rendering.
      noExternal: ['lucide-react'],
    },
  },
})
