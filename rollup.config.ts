import { RollupOptions } from 'rollup'
import typescript2 from 'rollup-plugin-typescript2'
import pkg from './package.json'

const options: RollupOptions = {
	input: 'src/index.ts',
	output: [
		{ file: pkg.module, format: 'es' },
		{ file: pkg.main, format: 'cjs' },
	],
	plugins: [
		typescript2(),
	],
}

export default options
