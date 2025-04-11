import { chunk } from '@/common/chunk.js';

describe('chunk', () => {
	test('단순 배열과 size를 전달하면 의도한 값이 노출된다', () => {
		expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
		expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
	});

	test('빈배열을 전달하면 []를 리턴한다', () => {
		expect(chunk([], 4)).toEqual([]);
	});

	test('배열의 총 길이보다 size가 더 크다면, 배열 자체를 리턴한다', () => {
		expect(chunk([1, 2, 3], 7)).toEqual([[1, 2, 3]]);
	});
});
