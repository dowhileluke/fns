import type { Entries, ObjectFn, ObjectPredicate } from './types'

/** Returns an object containing only the key/values from the source that match the predicate. (like Array#filter behavior) */
export function objectFilter<T extends Record<string, unknown>, V extends T[keyof T]>(object: T, predicate: ObjectPredicate<T, V>): Partial<Record<keyof T, V>>
/** Returns an object containing only the key/values from the source that match the predicate. (like Array#filter behavior) */
export function objectFilter<T extends Record<string, unknown>>(object: T, predicate: ObjectFn<T>): Partial<T>
export function objectFilter<T extends Record<string, unknown>>(object: T, predicate: ObjectFn<T>) {
	const result: Partial<T> = {}

	for (const [key, value] of Object.entries(object) as Entries<T>) {
		if (predicate(value, key, object)) {
			result[key] = value
		}
	}

	return result
}
