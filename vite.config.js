import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

function copyDtsPlugin() {
    return {
        name: 'copy-dts-plugin',
        closeBundle() {
            const distDir = resolve(__dirname, 'dist');
            if (!existsSync(distDir)) {
                mkdirSync(distDir, { recursive: true });
            }
            copyFileSync(
                resolve(__dirname, 'src/types/index.d.ts'),
                resolve(distDir, 'index.d.ts')
            );
        },
    };
}

export default defineConfig(({ command }) => {
    if (command === 'serve') {
        return {
            root: 'playground',
            plugins: [vue()],
            resolve: {
                alias: {
                    '@salvatorecervone/viewportlazy': resolve(__dirname, 'src/index.js'),
                },
            },
            server: {
                port: 3000,
                open: false,
            },
        };
    }

    return {
        plugins: [
            vue(),
            copyDtsPlugin(),
        ],
        build: {
            lib: {
                entry: resolve(__dirname, 'src/index.js'),
                name: 'ViewPortLazy',
                formats: ['es', 'umd'],
                fileName: (format) => (format === 'es' ? 'viewportlazy.mjs' : 'viewportlazy.umd.cjs'),
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    exports: 'named',
                    globals: {
                        vue: 'Vue',
                    },
                },
            },
            sourcemap: true,
        },
    };
});
