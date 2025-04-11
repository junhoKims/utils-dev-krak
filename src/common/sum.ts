type Arg = number | number[] | Record<string, number>;

/**
 * 인자로 받은 숫자를 더한 값을 반환하는 유틸 함수
 *
 * @example
 * sum(1); // 1
 * sum(1, 2); // 3
 * sum({ a: 1, b: 2, c: 3 }); // 6
 * sum([1, 2], [1, 2, 3]); // 9
 */
export const sum = (...args: [Arg, ...Arg[]]): number => {
	return args.reduce<number>((acc, cur) => {
		if (Array.isArray(cur)) {
			return acc + cur.reduce((a, c) => a + c, 0);
		}

		if (typeof cur === 'object' && cur !== null) {
			return acc + Object.values(cur).reduce((a, c) => a + c, 0);
		}

		return acc + cur;
	}, 0);
};
