/* eslint-disable @typescript-eslint/ban-types -- should work for literally any object */
export function getEnumerableSymbols<T extends {}>(object: T) {
	const symbolKeys = Object.getOwnPropertySymbols(object) as Array<symbol & keyof T>

	return symbolKeys.filter(s => Object.prototype.propertyIsEnumerable.call(object, s))
}
