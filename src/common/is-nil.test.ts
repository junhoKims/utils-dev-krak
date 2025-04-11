import { isNil } from '@/common/is-nil.js';

describe('isNil', () => {
	test('인자가 "null" 또는 "undefined"이면 true를 반환', () => {
		expect(isNil('')).toBe(false);
		expect(isNil({})).toBe(false);
		expect(isNil(0)).toBe(false);
		expect(isNil(null)).toBe(true);
		expect(isNil(undefined)).toBe(true);
	});
});
