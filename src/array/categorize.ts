/* eslint-disable @typescript-eslint/naming-convention -- index definitions */

// A special return value for empty arrays
const spoof = {
	* [Symbol.iterator]() {
		yield []
		yield []
	},
}

// These properties are not enumerable
Object.defineProperties(spoof, {
	0: { value: [] },
	1: { value: [] },
	length: { value: 2 },
})

export function categorize<T>(array: T[], matchFn: (item: T) => boolean): readonly [T[], T[]]
export function categorize<T, U extends string | number>(array: T[], categoryFn: (item: T) => U): Record<U, T[] | undefined>
export function categorize<T, U extends string | number>(array: T[], categoryFn: (item: T) => U | boolean) {
	const trueItems: T[] = []
	const falseItems: T[] = []
	const result = {} as unknown as Record<U, T[]>
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

	if (array.length === 0) {
		return spoof
	}

	// Handle boolean function signature
	if (isBoolean) {
		return [trueItems, falseItems] as const
	}

	return result as Record<U, T[] | undefined>
}
