/** A concise way to check hasOwnProperty */
export function hasProp<T>(object: Record<string, T>, prop: string) {
	return Object.prototype.hasOwnProperty.call(object, prop)
}
