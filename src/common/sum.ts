/**
 * 인자로 받은 숫자를 더한 값을 반환하는 유틸 함수
 *
 * @example
 * sum(1); // 1
 * sum(1, 2); // 3
 * sum({ a: 1, b: 2, c: 3 }); // 6
 */
export function sum(...args: [number, ...number[]]): number;
export function sum(obj: Record<string, number>): number;
export function sum(...args: [Record<string, number>] | number[]): number {
	if (typeof args[0] === 'object') {
		return Object.values(args[0]).reduce((acc, cur) => acc + cur, 0);
	}

	assertNumberArray(args);
	return args.reduce((acc, cur) => acc + cur, 0);
}

function assertNumberArray(args: unknown[]): asserts args is number[] {
	if (typeof args[0] !== 'number') {
		throw new Error('"sum" array args must be number');
	}
}
