import { tail } from './tail'

describe('tail()', () => {
	it('gets the last element', () => {
		expect(tail([1, 2, 3])).toEqual(3)
	})

	it('returns undefined for empty array', () => {
		expect(tail([])).toBeUndefined()
	})
})
