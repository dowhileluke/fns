/* eslint-disable @typescript-eslint/ban-types -- this is the specifially desired effect */
/** A concise way to check hasOwnProperty */
export function hasProp<T extends {}>(object: T, prop: string) {
	return Object.prototype.hasOwnProperty.call(object, prop)
}
