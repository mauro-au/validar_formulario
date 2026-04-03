import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  base: './',
  plugins: [
    ViteImageOptimizer({
      includePublic: true,
      jpg:  { quality: 90 },
      png:  { quality: 90 },
      svg: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: true },
        ],
      },
    }),
  ],
})
