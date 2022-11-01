/** Iterates the object's keys and maps the values to something new. (like Array#map behavior) */
export function objectMap<T extends Record<string, unknown>, U>(
	object: T,
	mapFn: (value: T[keyof T], key: keyof T, object: T) => U,
) {
	// Spread original object to preserve symbol keys
	const result = { ...object } as unknown as Record<keyof T, U>

	// Overwrite values for all iterable keys
	for (const [key, value] of Object.entries(object) as Array<[keyof T, T[keyof T]]>) {
		result[key] = mapFn(value, key, object)
	}

	return result
}
