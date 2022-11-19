import { generateArray } from '../array/generateArray'

export function spoofArray<T>(length: number, valueOrFn: T | ((index: number) => T)) {
	const valueFn = valueOrFn instanceof Function ? valueOrFn : () => valueOrFn
	const values = generateArray(length, valueFn)
	const result = {
		* [Symbol.iterator]() {
			for (let i = 0; i < length; i++) {
				yield values[i]
			}
		},
	}

	// Add properties that won't be iterated
	Object.defineProperty(result, 'length', { value: length })

	for (let i = 0; i < length; i++) {
		Object.defineProperty(result, i, { value: values[i] })
	}

	return result as T[]
}
