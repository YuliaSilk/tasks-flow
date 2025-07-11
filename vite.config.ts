import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      exclude: [/(\.br)$/,
        /(\.gz)$/],
      deleteOriginalAssets: false,
    }),
  ],
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-redux'],
          'vendor-redux': ['@reduxjs/toolkit', 'redux-persist'],
          'vendor-dnd': ['@hello-pangea/dnd'],
          'vendor-ui': ['@mui/material', '@emotion/react', '@emotion/styled'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    cssMinify: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-redux',
      '@reduxjs/toolkit',
      'redux-persist',
      '@hello-pangea/dnd',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
}); 