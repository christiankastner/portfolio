import { CorsOptions, defineConfig } from 'vite';
import macrosPlugin from 'vite-plugin-babel-macros';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    cors: '*' as CorsOptions,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './src/main.tsx',
      output: {
        format: 'umd',
        entryFileNames: 'main.js',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  assetsInclude: ['**/*.hdr', '**/*.glb'],
  plugins: [
    macrosPlugin(),
    // react({
    //   babel: {
    //     plugins: [
    //       'babel-plugin-twin', // enables use of tw prop without `import 'twin.macro'`
    //       'babel-plugin-macros',
    //       [
    //         '@emotion/babel-plugin-jsx-pragmatic',
    //         {
    //           export: 'jsx',
    //           import: '__cssprop',
    //           module: '@emotion/react',
    //         },
    //       ],
    //       [
    //         '@babel/plugin-transform-react-jsx',
    //         { pragma: '__cssprop' },
    //         'twin.macro',
    //       ],
    //     ],
    //     ignore: ['\x00commonjsHelpers.js'], // until resolved: https://github.com/ben-rogerson/babel-plugin-twin/issues/9#issuecomment-1092581846
    //   },
    // }),
  ],
});
