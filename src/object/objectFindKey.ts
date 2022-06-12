/** Iterates the object's keys and returns the first to match the predicate. (like Array#findIndex behavior) */
export function objectFindKey<T>(
	object: Record<string, T>,
	predicate: (value: T, key: string, object: Record<string, T>) => boolean,
) {
	for (const [key, value] of Object.entries(object)) {
		if (predicate(value, key, object)) {
			return key
		}
	}
}
