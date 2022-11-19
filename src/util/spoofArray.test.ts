import { spoofArray } from './spoofArray'

it('is iterable', () => {
	const [a, b, c, d] = spoofArray(3, 'text')

	expect(c).toEqual('text')
	expect(d).toBeUndefined()
})

it('behaves like an array for property access', () => {
	const result = spoofArray(5, 999)

	expect(result[2]).toEqual(999)
	expect(result).toHaveLength(5)
})

it('has no iterable properties', () => {
	const result = spoofArray(2, [])

	expect(Object.entries(result)).toHaveLength(0)
})

it('supports a mapping function for unique values', () => {
	const [a, b] = spoofArray(2, () => [])

	expect(a).not.toBe(b)
})

test('another mapping function', () => {
	const powers = spoofArray(4, n => 2 ** n)
	let total = 0

	// Can't use Array#reduce here, unfortunately
	for (const n of powers) {
		total += n
	}

	expect(total + 1).toEqual(2 ** 4)
})
