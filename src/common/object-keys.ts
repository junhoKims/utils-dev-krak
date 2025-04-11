/**
 * `Object.keys`의 결과에 대한 타입 안전성을 보장하는 유틸 함수
 *
 * @example
 * const keys = objectKeys({ A: 'A', B: 'B' }); // => ['A', 'B']
 */
export const objectKeys = <T extends Record<PropertyKey, any>>(value: T) => {
	return Object.keys(value) as ObjectKeys<T>[];
};
