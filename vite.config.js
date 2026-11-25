import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // Split the heavy, rarely-changing libraries into their own chunks so
        // they cache independently of app code. Three.js in particular is large
        // and is lazy-loaded, so it must not sit in the entry chunk.
        // Rolldown (Vite 8) requires the function form here.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('three')) return 'three'
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('react')) return 'react'
        },
      },
    },
  },
})
