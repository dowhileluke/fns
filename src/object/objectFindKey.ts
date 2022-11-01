/** Iterates the object's keys and returns the first to match the predicate. (like Array#findIndex behavior) */
export function objectFindKey<T extends Record<string | number, unknown>>(
	object: T,
	predicate: (value: T[keyof T], key: keyof T, object: T) => boolean,
) {
	for (const [key, value] of Object.entries(object)) {
		if (predicate(value as T[keyof T], key as keyof T, object)) {
			return key as keyof T
		}
	}
}
