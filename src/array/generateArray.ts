/* eslint-disable @typescript-eslint/unified-signatures -- preserve individualized jsdoc info */
type MapFn<T> = (n: number) => T
type MapIndexFn<T = number> = (_: unknown, index: number) => T

function sanitizeArgs<T>(a: number, b?: number | MapFn<T>, c?: MapFn<T>) {
	a = Math.trunc(a) // Convert to integer

	if (typeof b === 'number') {
		const isAscending = b > a
		const length = 1 + Math.abs(a - Math.trunc(b))

		return [a, length, isAscending, c] as const
	}

	return [0, a, true, b] as const
}

/** Creates an array of integers from `0` to `n-1`. */
export function generateArray(n: number): number[]
/** Creates an array of integers from `a` to `b` (inclusive). */
export function generateArray(a: number, b: number): number[]
/** Maps every integer from `0` to `n-1` into a list of values. */
export function generateArray<T>(n: number, mapFn: MapFn<T>): T[]
/** Maps every integer from `a` to `b` (inclusive) into a list of values. */
export function generateArray<T>(a: number, b: number, mapFn: MapFn<T>): T[]
export function generateArray<T>(a: number, b?: number | MapFn<T>, c?: MapFn<T>) {
	const [start, length, isAscending, mapFn] = sanitizeArgs(a, b, c)
	const indexToValue: MapIndexFn = isAscending ? (_, i) => start + i : (_, i) => start - i

	if (!mapFn) {
		return Array.from({ length }, indexToValue)
	}

	const indexToOutput: MapIndexFn<T> = (_, i) => mapFn(indexToValue(_, i))

	return Array.from({ length }, indexToOutput)
}
