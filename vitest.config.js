import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@salvatorecervone/viewportlazy': resolve(__dirname, 'src/index.js'),
        },
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['./test/setup.js'],
    },
});
