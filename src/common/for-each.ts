export function forEach<T>(arr: T[], fn: (value: T) => void) {
	for (const element of arr) {
		fn(element);
	}
}

export function forEachObject<T, U extends PropertyKey>(
	obj: Record<U, T>,
	fn: (key: U, value: T) => void,
) {
	for (const objKey in obj) {
		fn(objKey, obj[objKey]);
	}
}

export function times(n: number, fn: (n: number) => void) {
	for (let i = 0; i < n; i++) {
		fn(i);
	}
}

export function every<T>(arr: T[], fn: (value: T) => boolean): boolean {
	let result = true;

	for (const element of arr) {
		result = result && fn(element);
	}

	return result;
}

export function unary<T extends any[], U>(fn: (...args: any[]) => U) {
	return fn.length === 1 ? fn : (arg: T[number]) => fn(arg);
}

export function once(fn: () => void) {
	let done = false;
	return () => {
		if (done) return;
		done = true;
		fn();
	};
}
