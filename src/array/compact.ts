function isArrayForm<T>(array: T[] | T[][]): array is T[][] {
	return array.length === 1 && Array.isArray(array)
}

/** Removes all falsy values from the given array */
export function compact<T>(array: T[]): Array<NonNullable<T>>
/**
 * Returns an array that only contains truthy values from the list of arguments.
 *
 * For example: `compact(0, 1, 2)` -> `[1, 2]`
 */
export function compact<T>(...args: T[]): Array<NonNullable<T>>
export function compact<T>(...args: T[] | T[][]) {
	const arrayToCompact = isArrayForm(args) ? args[0] : args

	return arrayToCompact.filter(Boolean)
}
