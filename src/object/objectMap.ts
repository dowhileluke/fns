import { getEnumerableSymbols } from '../util/getEnumerableSymbols'
import type { Entries, ObjectFn } from './types'

/** Iterates the object's keys and maps the values to something new. (like Array#map behavior) */
export function objectMap<T extends Record<string, unknown>, U>(
	object: T,
	mapFn: ObjectFn<T, U>,
) {
	const result: Record<PropertyKey, U> = {}

	for (const [key, value] of Object.entries(object) as Entries<T>) {
		result[key] = mapFn(value, key, object)
	}

	for (const symbolKey of getEnumerableSymbols(object)) {
		result[symbolKey] = mapFn(object[symbolKey], symbolKey, object)
	}

	return result as Record<keyof T, U>
}
