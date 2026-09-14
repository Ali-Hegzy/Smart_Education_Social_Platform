import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: 'public', 
        emptyOutDir: false, 
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/resources/css/style.css'),
            },
            output: {
                assetFileNames: 'css/[name].[ext]',
            },
            },
    },
});