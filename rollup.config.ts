import type { RollupOptions } from 'rollup'
import typescript2 from 'rollup-plugin-typescript2'

const options: RollupOptions = {
	input: 'src/index.ts',
	output: [
		{ file: 'dist/index.esm.js', format: 'es' },
		{ file: 'dist/index.js', format: 'cjs' },
	],
	plugins: [
		typescript2({
			tsconfigOverride: {
				exclude: ['**/*.test.ts'],
			},
		}),
	],
}

export default options
