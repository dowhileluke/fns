import { truthy } from './truthy'

const mixedValues = [false, true, 0, 1, '', 'A', null, {}, undefined, [], Number.NaN, Number.POSITIVE_INFINITY]
const expectedResult = [true, 1, 'A', {}, [], Number.POSITIVE_INFINITY] // Truthy only

test('filter args', () => {
	expect(truthy(...mixedValues)).toEqual(expectedResult)
})

test('filter array', () => {
	expect(truthy(mixedValues)).toEqual(expectedResult)
})

test('single arg', () => {
	expect(truthy(false)).toEqual([])
})

test('empty array', () => {
	expect(truthy([])).toEqual([])
})

test('double array arg', () => {
	expect(truthy([], [])).toEqual([[], []])
})

// Lie to TypeScript to get a "boolean"
function falseFn(): boolean {
	return false
}

const boolTest = falseFn()
const nullTest = falseFn() ? {} : null
const zeroTest = falseFn() ? 1 : 0

test('TypeScript inference', () => {
	expect(truthy('pass', boolTest && 'fail', nullTest && 'fail', zeroTest && 'fail')).toEqual(['pass'])
})
