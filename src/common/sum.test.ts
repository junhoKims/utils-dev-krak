import { sum } from './sum.js';

describe('sum', () => {
	test('인자로 하나의 숫자만 전달하면 그 숫자가 반환된다', () => {
		expect(sum(1)).toBe(1);
	});

	test('인자로 2개의 숫자 이상을 전달되면 그 숫자들의 합이 반환된다', () => {
		expect(sum(1, 2)).toBe(3);
		expect(sum(1, 2, 3)).toBe(6);
	});

	test('인자로 객체가 전달되면 객체의 값들의 합이 반환된다', () => {
		expect(sum({ a: 1, b: 2, c: 3 })).toBe(6);
	});
});
