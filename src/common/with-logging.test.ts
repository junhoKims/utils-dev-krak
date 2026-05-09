import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import { withLogging } from './with-logging.js';

describe('withLogging', () => {
	let logSpy: MockInstance<typeof console.log>;

	beforeEach(() => {
		logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
	});

	afterEach(() => {
		logSpy.mockRestore();
	});

	test('원본 함수의 반환값을 그대로 리턴', () => {
		function add(a: number, b: number) {
			return a + b;
		}

		const loggedAdd = withLogging(add);

		expect(loggedAdd(1, 2)).toBe(3);
	});

	test('원본 함수가 동일한 인자로 호출됨', () => {
		const fn = vi.fn((a: number, b: number) => a * b);
		const logged = withLogging(fn);

		logged(3, 4);

		expect(fn).toHaveBeenCalledTimes(1);
		expect(fn).toHaveBeenCalledWith(3, 4);
	});

	test('호출 시 함수명과 인자가 @Call 로그로 출력됨', () => {
		function multiply(a: number, b: number) {
			return a * b;
		}

		const logged = withLogging(multiply);

		logged(2, 5);

		expect(logSpy).toHaveBeenNthCalledWith(1, '@Call: multiply(2, 5)');
	});

	test('실행 후 결과가 @Result 로그로 출력됨', () => {
		function multiply(a: number, b: number) {
			return a * b;
		}

		const logged = withLogging(multiply);

		logged(2, 5);

		expect(logSpy).toHaveBeenNthCalledWith(2, '@Result: 10');
	});

	test('인자가 없는 함수에서도 동작', () => {
		function greet() {
			return 'hello';
		}

		const logged = withLogging(greet);

		expect(logged()).toBe('hello');
		expect(logSpy).toHaveBeenNthCalledWith(1, '@Call: greet()');
		expect(logSpy).toHaveBeenNthCalledWith(2, '@Result: hello');
	});

	test('호출 순서: @Call 로그 → 원본 함수 실행 → @Result 로그', () => {
		const order: string[] = [];
		logSpy.mockImplementation((message: string) => {
			order.push(message);
		});

		function task() {
			order.push('executed');
			return 'done';
		}

		const logged = withLogging(task);
		logged();

		expect(order).toEqual(['@Call: task()', 'executed', '@Result: done']);
	});
});
