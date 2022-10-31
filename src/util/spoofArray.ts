export function spoofArray<T>(length: number, value: T) {
	const result = {
		* [Symbol.iterator]() {
			for (let i = 0; i < length; i++) {
				yield value
			}
		},
	}

	// Add properties that won't be iterated
	Object.defineProperty(result, 'length', { value: length })

	for (let i = 0; i < length; i++) {
		Object.defineProperty(result, i, { value })
	}

	return result as T[]
}
