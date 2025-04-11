import { sum } from './sum.js';

describe('sum', () => {
	test('인자에 숫자를 전달하면 합이 반환된다', () => {
		expect(sum(1)).toBe(1);
		expect(sum(1, 2)).toBe(3);
	});

	test('인자에 배열을 여러개 전달하면 그 배열들의 합이 반환된다', () => {
		expect(sum([1, 2])).toBe(3);
		expect(sum([1, 2], [1, 2, 3])).toBe(9);
	});

	test('인자에 객체를 여러개 전달하면 그 객체들의 합이 반환된다', () => {
		expect(sum({ a: 1, b: 2, c: 3 })).toBe(6);
		expect(sum({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBe(9);
	});

	test('인자에 숫자, 배열, 객체에 상관없이 넣어도 그에 대한 합을 반환한다', () => {
		expect(sum({ a: 1, b: 2, c: 3 }, [1, 2], 3)).toBe(12);
	});
});
