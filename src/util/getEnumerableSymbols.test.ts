import { getEnumerableSymbols } from './getEnumerableSymbols'

test('returns only iterable symbols', () => {
	const example = {
		strKey: true,
		[Symbol('1')]: true,
		[Symbol('2')]: true,
	}

	Object.defineProperty(example, Symbol('3'), { enumerable: false })

	expect(getEnumerableSymbols(example)).toHaveLength(2)
})

test('array', () => {
	expect(getEnumerableSymbols([])).toHaveLength(0)
})

test('native object', () => {
	expect(getEnumerableSymbols(JSON)).toHaveLength(0)
})
