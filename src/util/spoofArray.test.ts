import { sum } from '../array/sum'
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

it('is passes Array.isArray', () => {
	const result = spoofArray(9, 'nine')

	expect(Array.isArray(result)).toBeTruthy()
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
	const total = sum(powers)

	expect(total + 1).toEqual(2 ** 4)
})
