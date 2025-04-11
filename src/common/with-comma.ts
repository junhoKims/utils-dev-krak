/**
 * 숫자 또는 숫자로만 이루어진 문자열을 받아 콤마(comma)와 함께 문자열 반환
 *
 * @example
 * withComma('123,456,7') // '1,234,567'
 * withComma(-1234567) // '-1,234,567'
 */
export const withComma = (value: string | number) => {
	const isNumericString = (str: string): str is string =>
		/^-?\d+(\.\d+)?$/.test(str.replace(/,/g, ''));

	if (typeof value === 'string' && !isNumericString(value)) {
		throw new Error('숫자인 문자열만 허용합니다');
	}

	const number =
		typeof value === 'string'
			? Number.parseFloat(value.replace(/,/g, ''))
			: value;

	if (Number.isNaN(number)) {
		throw new Error('NaN은 허용하지 않습니다');
	}

	return number.toLocaleString('ko-KR');
};
