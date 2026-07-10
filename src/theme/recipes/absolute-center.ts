import { defineRecipe } from '@pandacss/dev'

export const absoluteCenter = defineRecipe({
  className: 'absolute-center',
  base: {
    display: 'inline-flex',
    position: 'absolute',
  },
  defaultVariants: {
    axis: 'both',
  },
  variants: {
    axis: {
      horizontal: { insetInlineStart: '50%', top: 'auto', transform: 'translateX(-50%)' },
      vertical: { top: '50%', insetInlineStart: 'auto', transform: 'translateY(-50%)' },
      both: { top: '50%', insetInlineStart: '50%', transform: 'translate(-50%, -50%)' },
    },
  },
})
