import { sum } from './sum'

test('adds numbers', () => {
	expect(sum([-3, 1, 4.5])).toEqual(2.5)
})

test('can return NaN', () => {
	expect(sum([1, 2, Number.NaN])).toEqual(Number.NaN)
})

test('empty array', () => {
	expect(sum([])).toEqual(0)
})

const objectArray = [
	{ value: 1 },
	{ value: 2 },
	{ value: 3 },
]

test('adds prop values', () => {
	expect(sum(objectArray, ({ value }) => value)).toEqual(6)
})

test('index param works', () => {
	expect(sum([1, 2, 3], (_, i) => i)).toEqual(3)
})
