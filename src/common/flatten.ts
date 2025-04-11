/**
 * 배열을 인자로 받은 depth만큼 평탄화시키는 유틸 함수
 *
 * @example
 * flatten(1, [2, 3], [4, [5, 6]]) // [1, 2, 3, 4, 5, 6]
 * flatten([1, [2, [3, [4]]]], 2) // [1, 2, 3, [4]]
 * flatten([1, [], [2, []], []]) // [1, 2]
 */
export const flatten = <T>(
	arr: (T | T[])[],
	depth = Number.POSITIVE_INFINITY,
) => {
	if (depth < 1) {
		return arr.slice();
	}

	return arr.reduce<T[]>((acc, cur) => {
		const value = (Array.isArray(cur) ? flatten(cur, depth - 1) : cur) as T[];
		return acc.concat(value);
	}, []);
};
