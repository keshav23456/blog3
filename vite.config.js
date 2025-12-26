import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": process.env
  },
  build: {
    // Stable chunk names to prevent cache issues
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['lucide-react', '@radix-ui/react-slot', '@radix-ui/react-switch'],
        },
      },
    },
    // Better cache control
    chunkSizeWarningLimit: 1000,
  },
})