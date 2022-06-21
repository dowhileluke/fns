/** Returns the sum of the provided numbers. */
export function sum(array: number[]): number
export function sum<T>(array: T[], mapFn: (item: T) => number): number
export function sum<T>(array: T[], mapFn?: (item: T) => number) {
	if (mapFn) {
		let total = 0

		for (const item of array) {
			total += mapFn(item)
		}

		return total
	}

	return (array as unknown as number[]).reduce((total, n) => total + n)
}
