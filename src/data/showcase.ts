import type { ImageMetadata } from 'astro'
import aceNeon from '@/assets/screenshots/ace-neon.png'
import akGcpd from '@/assets/screenshots/ak-gcpd.png'
import modGiant from '@/assets/screenshots/mod-giant.png'
import debugXray from '@/assets/screenshots/debug-xray.png'
import devMaterial from '@/assets/screenshots/dev-material.png'
import editorLights from '@/assets/screenshots/editor-lights.png'

export type TileSpan = 'feature' | 'wide' | 'tile'

export interface ShowcaseTile {
  src: ImageMetadata
  alt: string
  span: TileSpan
  pos: string
  w: number
}

// col/row spans map to a 4-column bento on desktop
export const showcaseTiles: ShowcaseTile[] = [
  {
    src: aceNeon,
    alt: 'ACE Chemicals lit up at night in Arkham City',
    span: 'feature',
    pos: 'center',
    w: 1100,
  },
  {
    src: akGcpd,
    alt: 'Batman: Arkham Knight overlooking the GCPD',
    span: 'wide',
    pos: 'center',
    w: 1000,
  },
  {
    src: modGiant,
    alt: 'An oversized enemy spawned in with BmSDK',
    span: 'tile',
    pos: 'center',
    w: 700,
  },
  { src: debugXray, alt: 'X-ray debug view of two players', span: 'tile', pos: 'center', w: 700 },
  {
    src: devMaterial,
    alt: 'Enemies re-shaded with a custom material through BmSDK',
    span: 'wide',
    pos: 'center',
    w: 1000,
  },
  {
    src: editorLights,
    alt: 'Editing a light actor and seeing it update live in-game',
    span: 'wide',
    pos: 'top',
    w: 1000,
  },
]
