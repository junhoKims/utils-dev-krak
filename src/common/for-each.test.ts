import {
	forEach,
	forEachObject,
	once,
	times,
	unary,
} from '@/common/for-each.js';

describe('for-each', () => {
	test('배열 순회하여 배열의 엘리먼트를 함수 인자로 전달', () => {
		const arr = [1, 2, 3];
		forEach(arr, (v) => console.log(v));
	});

	test('객체 순회하여 객체의 엘리먼트와 값을 함수 인자로 전달', () => {
		const obj = { a: 1, b: 2 };
		forEachObject(obj, (key, value) => console.log(key, value));
	});

	test('총 4회 반복', () => {
		times(4, (n) => console.log('i: ', n));
	});

	test('문자열 배열을 숫자로 변환', () => {
		const arr = ['1', '2', '3'];
		const result = arr.map(unary(Number.parseInt));
		expect(result).toStrictEqual([1, 2, 3]);
	});

	test('오직 한번 실행', () => {
		const doPay = once(() => console.log('pay'));
		doPay();
		doPay();
	});
});
