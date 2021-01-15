import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

export default {
  input: './src/index.js',
  output: [
    { file: pkg.main, format: 'esm' },
  ],
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**',
    }),
    del({ targets: ['dist/*'] }),
  ],
  external: ['react'],
};
