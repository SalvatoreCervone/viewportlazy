import vue from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: {
        name: 'ViewPortLazy',
        exports: 'named',
        globals: {
            vue: 'Vue',
        },
    },
    external: ['vue'],
    plugins: [
        commonjs(),
        vue({
            css: true,
            compileTemplate: true,
        }),
    ],
};
