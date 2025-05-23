import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
// import copy from 'rollup-plugin-copy'
// import dts from 'rollup-plugin-dts'
// import alias from '@rollup/plugin-alias'
// import replace from '@rollup/plugin-replace'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/bundle.min.js',
      format: 'iife',
      name: 'FanfulSDK',
      plugins: [terser()]
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      emitDeclarationOnly: true
    }),
    terser(),
    json(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
