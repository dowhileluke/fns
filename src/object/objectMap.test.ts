import { objectMap } from './objectMap'

const example: Record<string, number> = {
	one: 1,
	two: 2,
	three: 3,
}

test('objectMap', () => {
	expect(objectMap(example, x => x ** 2)).toEqual({ one: 1, two: 4, three: 9 })
})

type Example = {
	one: number;
	two: number;
	three: number;
}

test('objectMap typing', () => {
	const typedResult = objectMap(example as Example, x => x ** 2)

	// .one should autocomplete here
	expect(typeof typedResult.one).toEqual('number')
})

test('objectMap preserves symbols', () => {
	const input = {
		[Symbol.for('test')]: 'original',
		a: 'original',
		4: 'original', // eslint-disable-line @typescript-eslint/naming-convention
	}

	const output = objectMap(input, () => 'updated')

	expect(output[Symbol.for('test')]).toEqual('original')
	expect(output.a).toEqual('updated')
	expect(output[4]).toEqual('updated')
})
