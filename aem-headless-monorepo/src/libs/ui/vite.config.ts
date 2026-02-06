// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss({ 
          config: path.resolve(__dirname, 'tailwind.config.ts') 
        }) as any,
        autoprefixer() as any,
      ],
    },
  },
});
