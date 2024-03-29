import { categorize } from './categorize'

function toTruthy(value: any) {
	return value ? 'truthy' : 'falsy'
}

function isEven(value: number) {
	return (value % 2) === 0
}

const numbers = [1, 0, 3, 4, 1, 2, 3]
const alphas = ['c', 'b', 'c', 'a', 'b', 'd']
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const numberStringMix = [0, '0', 1, '1', 2]

test('boolean filter -- number array', () => {
	const [even, odd] = categorize(numbers, isEven)

	expect(even).toHaveLength(3)
	expect(odd).toHaveLength(4)
})

test('boolean filter -- empty array', () => {
	const result = categorize([], () => true)
	const [a, b] = result

	expect(result).toHaveLength(2)
	expect(a).toHaveLength(0)
	expect(b).toHaveLength(0)
})

test('string filter -- object array', () => {
	const result = categorize(alphas.map(value => ({ value })), x => x.value)

	expect(Object.entries(result)).toHaveLength(4)
	expect(result.b).toHaveLength(2)
	expect(result.z).toBeUndefined()
})

test('string filter -- empty array', () => {
	const result = categorize([], () => 'always')

	expect(Object.entries(result)).toHaveLength(0)
	expect(result.always).toBeUndefined()
	expect(result.another).toBeUndefined()
})

test('string union filter', () => {
	// This makes a Record<'truthy' | 'falsy', T[] | undefined> result, nice!
	const result = categorize(numbers, toTruthy)

	expect(result.truthy).toHaveLength(6)
	expect(result.falsy).toHaveLength(1)
})

test('number | string filter', () => {
	const result = categorize(numberStringMix, x => x)

	expect(result[0]).toHaveLength(2)
	expect(result['2']).toHaveLength(1)
})

test('number filter -- clump by index', () => {
	const result = categorize(alphabet, (_, i) => Math.floor(i / 5))

	expect(result[0]).toEqual(['a', 'b', 'c', 'd', 'e'])
	expect(result[5]).toEqual(['z'])
})

/// Additional type test ///

type MaybeValued = {
	value?: string;
}

type DefinitelyValued = {
	value: string;
}

function isValued(v: MaybeValued): v is DefinitelyValued {
	return typeof v.value === 'string'
}

const unsorted: MaybeValued[] = [
	{},
	{ value: 'yes' },
	{ value: 'certainly' },
]

test('boolean predicate filter', () => {
	const [itemsWithValue, itemsWithoutValue] = categorize(unsorted, isValued)

	// Lie to Typescript to cause runtime errors
	expect(() => itemsWithoutValue.map(({ value }) => value!.length)).toThrow()

	// Will have DefinitelyValued type
	expect(() => itemsWithValue.map(({ value }) => value.length)).not.toThrow()
})
