type Partition<K, T> = {
	key: K;
	values: T[];
}

type ValueType = string | number | boolean | null | undefined
type BoolCheck<K, T> = K extends boolean ? T[] : never

export function partition<T>(array: T[], partitionFn: (item: T) => boolean): readonly [T[], T[]]
export function partition<T, K extends ValueType>(array: T[], partitionFn: (item: T) => K): Array<Partition<K, T> | BoolCheck<K, T>>
export function partition<T, K extends ValueType>(array: T[], partitionFn: (item: T) => K) {
	const boolTrues: T[] = []
	const boolFalses: T[] = []
	const partitions: Record<string, Partition<K, T> | undefined> = {}
	const partitionKeys: string[] = []

	for (const item of array) {
		const key = partitionFn(item)
		const keyType = key === null ? 'null' : typeof key

		if (keyType === 'boolean') {
			if (key) {
				boolTrues.push(item)
			} else {
				boolFalses.push(item)
			}
		} else {
			const pk = keyType + String(key)
			const existing = partitions[pk]

			if (existing) {
				existing.values.push(item)
			} else {
				const newPartition: Partition<K, T> = {
					key,
					values: [item],
				}

				partitions[pk] = newPartition
				partitionKeys.push(pk)
			}
		}
	}

	const partitionArray = partitionKeys.map(pk => partitions[pk]!)
	const hasBools = boolTrues.length > 0 || boolFalses.length > 0

	if (hasBools) {
		if (partitionArray.length > 0) {
			return [boolTrues, ...partitionArray, boolFalses]
		}

		return [boolTrues, boolFalses] as const
	}

	return partitionArray
}
