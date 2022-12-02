import type { Entries, ObjectFn } from './types'

/** Iterates the object's keys and returns the first to match the predicate. (like Array#findIndex behavior) */
export function objectFindKey<T extends Record<string, unknown>>(
	object: T,
	predicate: ObjectFn<T>,
) {
	for (const [key, value] of Object.entries(object) as Entries<T>) {
		if (predicate(value, key, object)) {
			return key
		}
	}
}
