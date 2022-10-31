import { spoofArray } from '../util/spoofArray'

/** Divides an array into [matching[], remaining[]] based on a predicate. */
export function categorize<T>(array: T[], matchFn: (item: T) => boolean): readonly [T[], T[]]
/** Creates a dictionary where each entry holds a list of items that map to that key. */
export function categorize<T, U extends string | number>(array: T[], categoryFn: (item: T) => U): Record<U, T[] | undefined>
export function categorize<T, U extends string | number>(array: T[], categoryFn: (item: T) => U | boolean) {
	if (array.length === 0) {
		// Return an array-like result compatible with both overload signatures
		return spoofArray(2, [])
	}

	const trueItems: T[] = []
	const falseItems: T[] = []
	const result = {} as unknown as Record<U, T[] | undefined>
	let isBoolean = false

	for (const item of array) {
		const key = categoryFn(item)

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
