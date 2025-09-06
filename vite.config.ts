import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/navigation_flashcard_quiz/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})