export function spoofArray<T>(length: number, valueOrFn: T | ((index: number) => T)) {
	const valueFn = valueOrFn instanceof Function ? valueOrFn : () => valueOrFn
	const result: T[] = []

	// Add properties that won't be iterated
	for (let i = 0; i < length; i++) {
		Object.defineProperty(result, i, { value: valueFn(i) })
	}

	return result
}
