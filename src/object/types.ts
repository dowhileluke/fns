export type Entries<T extends Record<string, unknown>> = Array<[keyof T, T[keyof T]]>

/** A callback signature used when iterating over objects. */
export type ObjectFn<T extends Record<string, unknown>, U = unknown> = (value: T[keyof T], key: keyof T, object: T) => U
