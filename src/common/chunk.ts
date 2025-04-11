/**
 * 배열 안의 컨텐츠를 size에 따라 분할해주는 유틸 함수
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3], 1) // [[1], [2], [3]]
 * chunk([], 4) // []
 */
export const chunk = <T>(arr: T[], size = 1) => {
	if (!arr.length || size < 1) {
		return [];
	}

	const chunked: T[][] = [];

	for (let i = 0; i < arr.length; i += size) {
		chunked.push(arr.slice(i, i + size));
	}

	return chunked;
};
