// Internal only
export type Entries<T extends Record<string, unknown>> = Array<[keyof T, T[keyof T]]>

/** A callback signature used when iterating over objects. */
export type ObjectFn<T extends Record<string, unknown>, U = unknown> = (value: T[keyof T], key: keyof T, object: T) => U

/** A type predicate used when iterating over objects. */
export type ObjectPredicate<T extends Record<string, unknown>, V extends T[keyof T]> = (value: T[keyof T], key: keyof T, object: T) => value is V
