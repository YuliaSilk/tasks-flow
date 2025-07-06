import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'build',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-redux'],
                    'vendor-redux': ['@reduxjs/toolkit', 'redux-persist'],
                    'vendor-dnd': ['@hello-pangea/dnd'],
                    'vendor-ui': ['@mui/material', '@emotion/react', '@emotion/styled'],
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
