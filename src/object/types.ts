export type Entries<T extends Record<string, unknown>> = Array<[keyof T, T[keyof T]]>
export type ObjectFn<T extends Record<string, unknown>, U> = (value: T[keyof T], key: keyof T, object: T) => U
