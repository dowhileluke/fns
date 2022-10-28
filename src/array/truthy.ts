function isArrayForm<T>(array: T[] | T[][]): array is T[][] {
	return array.length === 1 && Array.isArray(array)
}

type Falsy = false | null | undefined | 0 | ''
type Truthy<T> = Exclude<T, Falsy>

/** Removes all falsy values from the given array */
export function truthy<T>(array: T[]): Array<Truthy<T>>
/**
 * Returns an array that only contains truthy values from the list of arguments.
 *
 * For example: `truthy(0, 1, 2)` -> `[1, 2]`
 */
export function truthy<T>(...args: T[]): Array<Truthy<T>>
export function truthy<T>(...args: T[] | T[][]) {
	const arrayToFilter = isArrayForm(args) ? args[0] : args

	return arrayToFilter.filter(Boolean)
}

/** @deprecated Use `truthy()` for identical behavior. */
export const compact = truthy
