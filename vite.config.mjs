import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        tailwindcss(), // تفعيل معالج Tailwind v4
    ],
    publicDir: false,
    build: {
        outDir: 'public',
        emptyOutDir: false,
        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, 'src/resources/css/style.css'),
            },
            output: {
                assetFileNames: 'css/[name].[ext]',
            },
        },
    },
});