import { flatten } from '@/common/flatten.js';

describe('flatten', () => {
	test('depth는 기본적으로 Infinity이며, 모든 배열을 평탄화한다', () => {
		expect(flatten([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6]);
	});

	test('depth가 2라면 2단계 깊이까지만 평탄화한다', () => {
		expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
	});
});
