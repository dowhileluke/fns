import { generateArray } from './generateArray'

type OneNumberTest = readonly [number, number[]]
type TwoNumberTest = readonly [number, number, number[]]

const oneNumberScenarios: OneNumberTest[] = [
	[3, [0, 1, 2]],
	[1.5, [0]],
	[1, [0]],
	[0, []],
	[-3, []],
]

test.each(oneNumberScenarios)('generateSeries(%d)', (n, result) => {
	expect(generateArray(n)).toEqual(result)
})

const twoNumberScenarios: TwoNumberTest[] = [
	[3, 0, [3, 2, 1, 0]],
	[1.5, 6.5, [1, 2, 3, 4, 5, 6]],
	[1, 1, [1]],
	[0, 0, [0]],
	[-3, 3, [-3, -2, -1, 0, 1, 2, 3]],
]

test.each(twoNumberScenarios)('generateSeries(%d, %d)', (a, b, result) => {
	expect(generateArray(a, b)).toEqual(result)
})

function toAlpha(i: number) {
	return 'abcdefghijklmnopqrstuvwxyz'.charAt(i)
}

test('-1 toAlpha', () => {
	expect(generateArray(-1, toAlpha)).toEqual([])
})

test('0 toAlpha', () => {
	expect(generateArray(0, toAlpha)).toEqual([])
})

test('3 toAlpha', () => {
	expect(generateArray(3, toAlpha)).toEqual(['a', 'b', 'c'])
})

test('0, 0, toAlpha', () => {
	expect(generateArray(0, 0, toAlpha)).toEqual(['a'])
})

test('1, 1, toAlpha', () => {
	expect(generateArray(1, 1, toAlpha)).toEqual(['b'])
})

test('6, 3, toAlpha', () => {
	expect(generateArray(6, 3, toAlpha)).toEqual(['g', 'f', 'e', 'd'])
})
