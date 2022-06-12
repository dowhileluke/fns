import { objectFindKey } from './objectFindKey'

const example: Record<string, number> = {
	one: 1,
	two: 2,
	three: 3,
}

test('objectFindKey (missing)', () => {
	expect(objectFindKey(example, x => x > 5)).toBeUndefined()
})

test('objectFindKey (by value)', () => {
	expect(objectFindKey(example, x => x > 2)).toBe('three')
})

test('objectFindKey (by key)', () => {
	expect(objectFindKey(example, (_, key) => key.endsWith('o'))).toBe('two')
})
