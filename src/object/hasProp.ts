/* eslint-disable @typescript-eslint/ban-types -- this is the specifially desired effect */
/** Tests `hasOwnProperty` for the object. */
export function hasProp<T extends {}, K extends PropertyKey>(object: T, prop: K): object is T & Record<K, unknown> {
	return Object.prototype.hasOwnProperty.call(object, prop)
}
