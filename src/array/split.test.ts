import { split } from './split'

const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8]

describe('split()', () => {
	test('length: 9, index: 0', () => {
		const [one, two] = split(indexes, 0)
	
		expect(one).toEqual([])
		expect(two).toEqual(indexes)
	})
	
	test('length: 9, index: 4', () => {
		const [one, two] = split(indexes, 4)
	
		expect(one).toEqual([0, 1, 2, 3])
		expect(two).toEqual([4, 5, 6, 7, 8])
	})
	
	test('length: 0, index: 1', () => {
		const [one, two] = split([], 1)
	
		expect(one).toEqual([])
		expect(two).toEqual([])
	})
	
	test('empty string', () => {
		const [one, two] = split('', 20)
	
		expect(one).toEqual('')
		expect(two).toEqual('')
	})
	
	test('string, index: -2', () => {
		const [one, two] = split('123456', -2)
	
		expect(one).toEqual('1234')
		expect(two).toEqual('56')
	})
})
