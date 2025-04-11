/**
 * 대상이 "null" 또는 "undefined"인지 쉽게 찾아주는 유틸 함수
 *
 * @example
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil('test') // false
 */
export const isNil = (value: unknown) => {
	return !!(typeof value === 'undefined' || value === null);
};
