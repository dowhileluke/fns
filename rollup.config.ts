import { RollupOptions } from 'rollup'
// import { isAbsolute } from 'path'
// import { nodeResolve } from '@rollup/plugin-node-resolve'
// import { babel } from '@rollup/plugin-babel'
// import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
import typescript2 from 'rollup-plugin-typescript2'

const opts: RollupOptions = {
	input: 'src/index.ts',
	output: [
		{ file: pkg.module, format: 'es' },
		{ file: pkg.main, format: 'cjs' },
	],
	plugins: [
		typescript2(),
		// typescript2({ useTsconfigDeclarationDir: true, }),
	],
}

export default opts
