import { objectMap } from './objectMap'

const example: Record<string, number> = {
	one: 1,
	two: 2,
	three: 3,
}

test('objectMap', () => {
	expect(objectMap(example, x => x ** 2)).toEqual({ one: 1, two: 4, three: 9 })
})
