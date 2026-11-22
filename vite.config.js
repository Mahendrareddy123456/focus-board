import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative base ensures assets load flawlessly on GitHub Pages, Vercel, Netlify, and local preview
  server: {
    port: 3000,
    open: true
  }
})
