/**
 * 대상이 빈배열, 빈객체, 빈문자열 여부인지를 쉽게 찾아주는 유틸함수
 *
 * @example
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty('') // true
 * isEmpty('test') // false
 */
export const isEmpty = (value: unknown) => {
	if (typeof value === 'string' && value.length > 0) {
		return false;
	}

	if (Array.isArray(value) && value.length > 0) {
		return false;
	}

	if (value?.constructor === Object && Object.keys(value).length > 0) {
		return false;
	}

	return true;
};
