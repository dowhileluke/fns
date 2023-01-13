import { objectFilter } from './objectFilter'

const example: Record<string, number> = {
	zero: 0,
	one: 1,
	two: 2,
	three: 3,
}

test('objectFilter (missing)', () => {
	const result = objectFilter(example, x => x > 5)

	expect(result).toEqual({})
})

test('objectFilter (by value)', () => {
	const result = objectFilter(example, x => x > 2)

	expect(result.three).not.toBeUndefined()
})

test('objectFilter (by key)', () => {
	const result = objectFilter(example, (_, key) => key.startsWith('t'))

	expect(Object.values(result)).toHaveLength(2)
})

test('objectFilter truthy', () => {
	const result = objectFilter(example, n => n)

	expect(Object.values(result).every(Boolean)).toBeTruthy()
})

/// TYPE TESTS ///

const mixed = {
	a: 1,
	b: 'two',
	c: false,
}

function isTwo(v: unknown): v is 'two' {
	return v === 'two'
}

function isThree(v: unknown): v is 'three' {
	return v === 'three'
}

test('type predicate', () => {
	const result = objectFilter(mixed, isTwo)

	expect(Object.values(result)).toHaveLength(1)
	expect(Object.values(result).every(v => isTwo(v))).toBeTruthy()
})

test('type predicate - empty', () => {
	const result = objectFilter(mixed, isThree)

	expect(Object.values(result)).toHaveLength(0)
	expect(Object.values(result).every(v => isThree(v))).toBeTruthy()
})

// Elaborate type example
type MaybeValued = {
	value?: string;
}

type DefinitelyValued = {
	value: string;
}

type ValueCollection = Record<'a' | 'b' | 'c', MaybeValued>

function isValued(v: MaybeValued): v is DefinitelyValued {
	return typeof v.value === 'string'
}

const unsorted: ValueCollection = {
	a: {},
	b: { value: 'yes' },
	c: { value: 'certainly' },
}

test('advanced predicate', () => {
	const result = objectFilter(unsorted, isValued)

	expect(() => Object.values(result).map(dv => dv.value.toUpperCase())).not.toThrow()
})
