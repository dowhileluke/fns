import { spoofArray } from '../util/spoofArray'

/** Divides an array into [matching[], remaining[]] based on a predicate. */
export function categorize<T, S extends T>(array: T[], matchFn: (value: T, index: number) => value is S): [S[], T[]]
/** Divides an array into [matching[], remaining[]] based on a predicate. */
export function categorize<T>(array: T[], matchFn: (value: T, index: number) => boolean): [T[], T[]]
/** Creates a dictionary where each entry holds a list of items that map to that key. */
export function categorize<T, U extends string | number>(array: T[], categoryFn: (value: T, index: number) => U): Partial<Record<U, T[]>>
export function categorize<T, U extends string | number>(array: T[], categoryFn: (value: T, index: number) => U | boolean) {
	if (array.length === 0) {
		// Return an array-like result compatible with all overload signatures
		return spoofArray(2, () => [])
	}

	const trueItems: T[] = []
	const falseItems: T[] = []
	const result: Partial<Record<U, T[]>> = {}
	let isBoolean = false

	for (const [index, item] of array.entries()) {
		const key = categoryFn(item, index)

		// Track all items by truthiness
		if (key) {
			trueItems.push(item)
		} else {
			falseItems.push(item)
		}

		if (typeof key === 'boolean') {
			isBoolean = true
		} else {
			const existing = result[key]

			if (existing) {
				existing.push(item)
			} else {
				result[key] = [item]
			}
		}
	}

	// Handle boolean function signature
	if (isBoolean) {
		return [trueItems, falseItems] as const
	}

	return result
}
