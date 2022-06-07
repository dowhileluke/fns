/* eslint-disable @typescript-eslint/unified-signatures -- preserve individualized jsdoc info */
type MapFn<T> = (n: number) => T

function sanitizeArgs<T>(a: number, b?: number | MapFn<T>, c?: MapFn<T>) {
	a = Math.trunc(a) // Strip fractions

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

	return Array.from({ length }, (_, i) => {
		const n = isAscending ? start + i : start - i

		return mapFn ? mapFn(n) : n
	})
}
