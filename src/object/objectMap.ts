/** Iterates the object's keys and maps the values to something new. (like Array#map behavior) */
export function objectMap<T, U>(
	object: Record<string, T>,
	mapFn: (value: T, key: string, object: Record<string, T>) => U,
) {
	const result: Record<string, U> = {}

	for (const [key, value] of Object.entries(object)) {
		result[key] = mapFn(value, key, object)
	}

	return result
}
