function isArrayForm<T>(array: T[] | T[][]): array is T[][] {
	return array.length === 1 && Array.isArray(array[0])
}

export type Falsy = false | null | undefined | 0 | ''

/** Returns an array containing only truthy elements from the given array. */
export function truthy<T>(array: Array<T | Falsy>): T[]
/**
 * Returns an array containing only truthy values from the list of arguments.
 *
 * For example: `truthy(0, 1, 2)` -> `[1, 2]`
 */
export function truthy<T>(...args: Array<T | Falsy>): T[]
export function truthy<T>(...args: Array<T | Falsy> | Array<Array<T | Falsy>>) {
	const arrayToFilter = isArrayForm(args) ? args[0] : args

	return arrayToFilter.filter(Boolean)
}

/** @deprecated Use `truthy()` for identical behavior. */
export const compact = truthy
