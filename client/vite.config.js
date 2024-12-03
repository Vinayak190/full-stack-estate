import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://full-stack-estate-7zs3.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
