/* eslint-disable @typescript-eslint/ban-types -- this is the specifially desired effect */
/** Tests `hasOwnProperty` for the object. */
export function hasProp<T extends {}>(object: T, prop: string) {
	return Object.prototype.hasOwnProperty.call(object, prop)
}
