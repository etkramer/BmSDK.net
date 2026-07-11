import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'
import blue from '@park-ui/panda-preset/colors/blue'
import slate from '@park-ui/panda-preset/colors/slate'

export default defineConfig({
  preflight: true,
  presets: [createPreset({ accentColor: blue, grayColor: slate, radius: 'md' })],
  include: ['./src/**/*.{ts,tsx,js,jsx,astro}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',

  plugins: [
    {
      name: 'Remove Panda Preset Colors',
      hooks: {
        'preset:resolved': ({ utils, preset, name }) =>
          name === '@pandacss/preset-panda'
            ? utils.omit(preset, ['theme.tokens.colors', 'theme.semanticTokens.colors'])
            : preset,
      },
    },
  ],

  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: {
            value:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
          },
          mono: {
            value:
              "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
          },
        },
      },
      recipes: {
        // Bordered surface used by game cards, the code panel, step rows, and
        // showcase tiles. Padding/layout stays at the call site.
        surface: {
          className: 'surface',
          base: { border: '1px solid', borderColor: 'border.default' },
          variants: {
            tone: {
              canvas: { bg: 'bg.canvas' },
              subtle: { bg: 'bg.subtle' },
              inset: { bg: 'gh.inset' },
            },
            radius: {
              lg: { borderRadius: 'lg' },
              xl: { borderRadius: 'xl' },
            },
          },
          defaultVariants: { tone: 'canvas', radius: 'xl' },
        },
        // Small centered square that holds a feature/game icon or the logo glyph.
        iconTile: {
          className: 'icon-tile',
          base: { display: 'grid', placeItems: 'center', flexShrink: '0' },
          variants: {
            size: {
              sm: { w: '7', h: '7' },
              md: { w: '10', h: '10' },
              lg: { w: '11', h: '11' },
            },
            tone: {
              muted: { bg: 'gh.neutralMuted', color: 'gh.link', borderRadius: 'lg' },
              outline: {
                border: '1px solid',
                borderColor: 'border.default',
                bg: 'bg.subtle',
                color: 'fg.default',
                borderRadius: 'lg',
              },
              brand: { bg: 'accent.default', color: 'white', borderRadius: 'md' },
            },
          },
          defaultVariants: { size: 'md', tone: 'muted' },
        },
      },
      semanticTokens: {
        colors: {
          // Retune the accent (blue) to GitHub's blue so solid buttons, the
          // logo, and links all sit in the same family. Buttons read the
          // default colorPalette (blue.default); accent.* backs the logo mark.
          blue: {
            default: { value: { _light: '#0969da', _dark: '#2f81f7' } },
            emphasized: { value: { _light: '#0860ca', _dark: '#4a9eff' } },
          },
          accent: {
            default: { value: { _light: '#0969da', _dark: '#2f81f7' } },
            emphasized: { value: { _light: '#0860ca', _dark: '#4a9eff' } },
          },

          // GitHub Primer chrome — { dark default theme, light theme }
          bg: {
            canvas: { value: { _light: '#ffffff', _dark: '#0d1117' } },
            default: { value: { _light: '#ffffff', _dark: '#0d1117' } },
            subtle: { value: { _light: '#f6f8fa', _dark: '#161b22' } },
            muted: { value: { _light: '#eaeef2', _dark: '#21262d' } },
            emphasized: { value: { _light: '#d0d7de', _dark: '#30363d' } },
          },
          fg: {
            default: { value: { _light: '#1f2328', _dark: '#e6edf3' } },
            muted: { value: { _light: '#59636e', _dark: '#8b949e' } },
            subtle: { value: { _light: '#818b98', _dark: '#6e7681' } },
          },
          border: {
            default: { value: { _light: '#d1d9e0', _dark: '#30363d' } },
            subtle: { value: { _light: '#d8dee4', _dark: '#21262d' } },
            outline: { value: { _light: '#0969da', _dark: '#2f81f7' } },
          },

          // Extra GitHub tokens for direct use on the page
          gh: {
            inset: { value: { _light: '#f6f8fa', _dark: '#010409' } },
            link: { value: { _light: '#0969da', _dark: '#2f81f7' } },
            linkHover: { value: { _light: '#0757ba', _dark: '#58a6ff' } },
            neutralMuted: {
              value: { _light: 'rgba(175,184,193,0.2)', _dark: 'rgba(110,118,129,0.4)' },
            },
          },
        },
      },
    },
  },
})
