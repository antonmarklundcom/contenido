import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Hostinger static hosting: plain relative asset paths, no SSR.
    assetsInlineLimit: 2048,
  },
});
