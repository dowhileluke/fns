/** Returns the sum of the provided numbers. */
export function sum(array: number[]): number
export function sum<T>(array: T[], mapFn: (value: T, index: number) => number): number
export function sum<T>(array: T[], mapFn?: (value: T, index: number) => number) {
	if (mapFn) {
		let total = 0

		for (const [index, item] of array.entries()) {
			total += mapFn(item, index)
		}

		return total
	}

	return (array as unknown as number[]).reduce((total, n) => total + n, 0)
}
