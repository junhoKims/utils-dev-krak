import { objectKeys } from '@/common/object-keys.js';

describe('objectKeys', () => {
	test('`객체의 키가 명확한 타입이 반영된 배열로 반환된다', () => {
		const result = objectKeys({ a: 1, b: 'c' });
		expect(result).toStrictEqual(['a', 'b']);
	});
});
