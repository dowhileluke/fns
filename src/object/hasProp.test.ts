import { hasProp } from './hasProp'

describe('hasProp()', () => {
	it('finds an explicit property', () => {
		expect(hasProp({ k: 'v' }, 'k')).toBeTruthy()
	})

	it('does not find an inherited property', () => {
		expect(hasProp({}, 'toString')).toBeFalsy()
	})

	it('finds props set to undefined', () => {
		expect(hasProp({ u: undefined }, 'u')).toBeTruthy()
	})

	it('works across types', () => {
		expect(hasProp([], 'length')).toBeTruthy()
		expect(hasProp('abc', 'length')).toBeTruthy()
	})
})
