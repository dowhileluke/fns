import { compact } from './compact'

// Some truthy values
const expectedResult = [true, 1, 'A', {}, [], Number.POSITIVE_INFINITY]

test('compact array', () => {
	expect(compact<any>(false, true, 0, 1, '', 'A', null, {}, undefined, [], Number.NaN, Number.POSITIVE_INFINITY)).toEqual(expectedResult)
})

test('compact array', () => {
	expect(compact([false, true, 0, 1, '', 'A', null, {}, undefined, [], Number.NaN, Number.POSITIVE_INFINITY])).toEqual(expectedResult)
})
