type Curried<P extends readonly unknown[], R> = P extends readonly [
	infer Head,
	...infer Tail,
]
	? Tail extends readonly []
		? (arg: Head) => R
		: (arg: Head) => Curried<Tail, R>
	: never;

/**
 * 다항 함수를 단항 함수들의 체인으로 변환하는 커링 함수.
 * 인자는 한 번에 하나씩만 전달해야 하며, 모든 인자가 채워지면 원본 함수가 호출됩니다.
 *
 * @param fn 커링할 함수 (1개 이상의 인자를 받는 함수)
 * @returns 단항 함수들의 체인
 * @throws {TypeError} fn이 함수가 아닐 때
 *
 * @example
 * // 예제 1 — 4-인자 함수
 * function logger(mode: string, initMsg: string, errMsg: string, lineNo: number) {
 *   console.debug(mode, initMsg, errMsg + ' at line: ' + lineNo);
 * }
 * const debugLogger = curry(logger)('DEBUG')('Init Debug Error');
 * debugLogger('debug show')(21);
 *
 * @example
 * // 예제 2 — 2-인자 함수
 * const matched = curry((expr: RegExp, str: string) => str.match(expr));
 * const hasNumber = matched(/[0-9]+/);
 * hasNumber('js1'); // ['1']
 *
 * @remarks
 * 기본값/rest 파라미터가 있는 함수는 `fn.length`가 실제 인자 수와 다를 수 있어
 * 의도대로 동작하지 않을 수 있습니다.
 */
export function curry<P extends readonly unknown[], R>(
	fn: (...args: P) => R,
): Curried<P, R> {
	if (typeof fn !== "function") {
		throw new TypeError("curry: argument must be a function");
	}

	const collect = (collected: unknown[]): unknown =>
		collected.length >= fn.length
			? fn(...(collected as unknown as P))
			: (arg: unknown) => collect([...collected, arg]);

	return collect([]) as Curried<P, R>;
}
