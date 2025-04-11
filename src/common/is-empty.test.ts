import { isEmpty } from '@/common/is-empty.js';

describe('isEmpty', () => {
	test('인자가 "boolean", "number", "Symbol", "함수"면 true를 반환', () => {
		expect(isEmpty(true)).toBe(true);
		expect(isEmpty(1)).toBe(true);
		expect(isEmpty(Symbol())).toBe(true);
		expect(
			isEmpty(() => {
				console.log('test');
			}),
		).toBe(true);
	});

	test('인자가 "문자열"이고 비어있으면 true를 반환', () => {
		expect(isEmpty('')).toBe(true);
		expect(isEmpty('test')).toBe(false);
	});

	test('인자가 "null"이거나 "undefined"이면 true를 반환', () => {
		expect(isEmpty(null)).toBe(true);
		expect(isEmpty(undefined)).toBe(true);
	});

	test('인자가 배열 또는 객체고 값이 존재하지 않으면 true를 반환', () => {
		expect(isEmpty([])).toBe(true);
		expect(isEmpty([1, 2, 3])).toBe(false);
		expect(isEmpty({})).toBe(true);
		expect(isEmpty({ key: 'value' })).toBe(false);
	});
});
