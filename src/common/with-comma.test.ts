import { withComma } from './with-comma.js';

describe('withComma', () => {
	test('콤마가 잘못 표기된 숫자형 문자열을 콤마가 잘 표기된 문자열로 변경', () => {
		expect(withComma('123,456,7')).toBe('1,234,567');
		expect(withComma('10000,0')).toBe('100,000');
	});

	test('음수거나, 음수인 숫자형 문자열을 콤마를 포함한 음수 문자열로 변경', () => {
		expect(withComma('-1,234,567')).toBe('-1,234,567');
		expect(withComma(-1234567)).toBe('-1,234,567');
	});

	test('인자에 숫자가 아닌 문자가 포함되어 있으면 에러 리턴', () => {
		expect(() => withComma('123456789원')).toThrowError(
			/\숫자인 문자열만 허용합니다/,
		);
		expect(() => withComma('가나다라바사바')).toThrowError(
			/\숫자인 문자열만 허용합니다/,
		);
	});

	test('인자 NaN이라면 에러 리턴', () => {
		expect(() => withComma(Number.NaN)).toThrowError(/NaN은 허용하지 않습니다/);
	});
});
