import { partition } from './partition'

const bools = [false, true, true, false, true]
const boolProps = bools.map(b => ({ value: b }))
const alphas = ['a', 'c', 'b', 'a', 'd', 'b']

type MixedValue = { value: boolean | string | null }

const mixed: MixedValue[] = [...bools, ...alphas, null].map(value => ({ value }))

describe('array/partition', () => {
	it('groups booleans', () => {
		const [, b] = partition(bools, x => x)

		expect(b.every(x => !x)).toBeTruthy()
	})

	it('groups booleans from props', () => {
		const [a] = partition(boolProps, x => x.value)

		expect(a.every(x => x.value)).toBeTruthy()
	})

	it('groups strings', () => {
		const result = partition(alphas, x => x)
		const bees = result.find(x => x.key === 'b')
		const zeez = result.find(x => x.key === 'z')

		expect(result).toHaveLength(4)
		expect(bees?.values).toHaveLength(2)
		expect(zeez).toBeUndefined()
	})

	it('groups mixed values', () => {
		const result = partition(mixed, x => x.value)

		expect(result).toHaveLength(7) // For: For: true, false, 'a', 'b', 'c', 'd', null
	})

	it('groups mixed values', () => {
		const result = partition(mixed, x => x.value)

		expect(result).toHaveLength(7) // For: true, false, 'a', 'b', 'c', 'd', null
	})

	it('always returns true/false partitions if at least one bool is present', () => {
		const result = partition([false], x => x)

		expect(result).toHaveLength(2) // For: true, false
	})

	it('will not group strings and bools together', () => {
		const result = partition([true, 'true'], x => x)

		expect(result).toHaveLength(3) // For: true, false, 'true'
	})
})
