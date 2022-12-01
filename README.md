# fns
A collection of utility functions that I am too frequently copying between projects.

No dependencies, 50+ tests, tree-shakable, type-safe.

```
npm i @dowhileluke/fns
```

**Array Methods**

* [`categorize`](#categorize)
* [`generateArray`](#generatearray)
* [`split`](#split)
* [`sum`](#sum)
* [`tail`](#tail)
* [`truthy`](#truthy)

**Object Methods**

* [`hasProp`](#hasprop)
* [`objectFindKey`](#objectfindkey)
* [`objectMap`](#objectmap)

# Array Methods

### `categorize`
subdivide an array by some property of each element

```js
const a = { age: 17 }
const b = { age: 40 }
const c = { age: 66 }

// Mode 1 -- boolean
const [babies, others] = categorize([a, b, c], x => x.age < 2)
// babies = []
// others = [a, b, c]

// Mode 2 -- category
function toCategory(person) {
	if (person.age < 2) return 'baby'
	if (person.age < 13) return 'child'
	if (person.age < 20) return 'teen'
	
	return 'adult'
}

const ageGroups = categorize([a, b, c] => toCategory)
// ageGroups.baby  = undefined
// ageGroups.child = undefined
// ageGroups.teen  = [a]
// ageGroups.adult = [b, c]
// Object.keys(ageGroups) = ['teen', 'adult']
```

### `generateArray`
create a new array for a chosen number of elements or range of integer values

```js
generateArray(4) // [0, 1, 2, 3]
generateArray(2, -2) // [2, 1, 0, -1, -2]

// optional argument: map function
generateArray(1, 3, n => null) // [null, null, null]
```

### `split`
split an array (or string) in two at a given index

```js
const [manyItems, finalTwo] = split([1, 2, 3, 4, 5], -2)
// manyItems = [1, 2, 3]
// finalTwo = [4, 5]

split('example', 2) // ['ex', 'ample']
```

### `sum`
find the total of the given numbers

```js
// Mode 1 -- simple
sum([1, 2, 3]) // 6

// Mode 2 -- element property
const cart = [
	{ price: 50, quantity: 2 },
	{ price: 20, quantity: 1 }
]

sum(cart, x => x.price * x.quantity) // 120
```

### `tail`
get the last element

```js
tail([5, 10, 15, 20]) // 20
```

### `truthy`
filter a list to include only truthy elements

```js
// Mode 1 -- array
truthy([0, 1, 2]) // [1, 2]

// Mode 2 -- arguments
const isRounded = false

truthy('box', isRounded && 'rounded') // ['box']
```

# Object Methods

### `hasProp`
check if an object contains a key

```js
const example = { u: undefined }

hasProp(example, 'u') // true
hasProp(example, 'x') // false
hasProp('str', 'toLowerCase') // false, only exists on prototype
```

### `objectFindKey`
find an element in an object and return its key (like Array#findIndex)

```js
const a = { value: 1 }
const b = { value: 2 }
const c = { value: 3 }

objectFindKey({ a, b, c }, x => x.value === 2) // 'b'
```

### `objectMap`
convert each element in an object (like Array#map)

```js
objectMap({ a: 1, b: 2, c: 3 }, x => x ** 2)
// { a: 1, b: 4, c: 9 }
```
