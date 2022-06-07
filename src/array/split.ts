/** Splits an array into separate arrays at the given index. */
export function split<T>(array: T[], index: number): readonly [T[], T[]]
/** Splits a string into separate strings at the given index. */
export function split(s: string, index: number): readonly [string, string]
export function split<T>(arrayOrString: T[] | string, index: number) {
	const one = arrayOrString.slice(0, index)
	const two = arrayOrString.slice(index)

	return [one, two] as const
}
