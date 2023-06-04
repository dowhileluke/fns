/* eslint-disable @typescript-eslint/naming-convention */
import { objectFindKey } from './objectFindKey'

const example: Record<string, number> = {
	zero: 0,
	one: 1,
	two: 2,
	three: 3,
}

test('objectFindKey (missing)', () => {
	expect(objectFindKey(example, x => x > 5)).toBeUndefined()
})

test('objectFindKey (by value)', () => {
	expect(objectFindKey(example, x => x > 2)).toBe('three')
})

test('objectFindKey (by key)', () => {
	expect(objectFindKey(example, (_, key) => key.startsWith('o'))).toBe('one')
})

test('objectFindKey (symbol)', () => {
	const o: Record<PropertyKey, boolean | string> = {
		[Symbol.for('test')]: true,
		a: 'str',
		b: false,
	}

	expect(objectFindKey(o, value => value === true)).toEqual(Symbol.for('test'))
})

test('objectFindKey truthy', () => {
	expect(objectFindKey(example, n => n)).toBeTruthy()
})

test('objectFindKey typing', () => {
	const input = {
		1: 'one',
		2: 'two',
		3: 'three',
	}

	const typedResult = objectFindKey(input, () => true)

	if (typeof typedResult !== 'undefined') {
		// Inside guard, typedResult = 1 | 2 | 3
		expect(typeof input[typedResult]).toEqual('string')
	}
})
