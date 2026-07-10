// lucide-react has no `exports` map, so a bare `import ... from 'lucide-react'`
// resolves to its CommonJS entry and breaks Astro's static render. Importing the
// per-icon ESM files directly avoids that. Keep the deep paths contained here.
export { default as Download } from 'lucide-react/dist/esm/icons/download.mjs'
export { default as BookText } from 'lucide-react/dist/esm/icons/book-text.mjs'
export { default as Building2 } from 'lucide-react/dist/esm/icons/building-2.mjs'
export { default as Skull } from 'lucide-react/dist/esm/icons/skull.mjs'
export { default as ArrowRight } from 'lucide-react/dist/esm/icons/arrow-right.mjs'
export { default as ArrowUpRight } from 'lucide-react/dist/esm/icons/arrow-up-right.mjs'
export { default as Braces } from 'lucide-react/dist/esm/icons/braces.mjs'
export { default as Bug } from 'lucide-react/dist/esm/icons/bug.mjs'
export { default as FileCode2 } from 'lucide-react/dist/esm/icons/file-code-2.mjs'
