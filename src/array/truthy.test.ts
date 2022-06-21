import { truthy } from './truthy'

const mixedValues = [false, true, 0, 1, '', 'A', null, {}, undefined, [], Number.NaN, Number.POSITIVE_INFINITY]
const expectedResult = [true, 1, 'A', {}, [], Number.POSITIVE_INFINITY] // Truthy only

test('filter args', () => {
	expect(truthy(...mixedValues)).toEqual(expectedResult)
})

test('filter array', () => {
	expect(truthy(mixedValues)).toEqual(expectedResult)
})
