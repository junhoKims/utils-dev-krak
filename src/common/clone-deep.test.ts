import { cloneDeep } from '@/common/clone-deep.js';

describe('cloneDeep', () => {
	test('객체를 딥하게 복제한다', () => {
		const obj = { user: { role: 'admin', id: '123' } };

		const clone = cloneDeep(obj);
		obj.user.role = 'hello';

		expect(clone.user.role).toBe('admin');
	});

	test('배열도 복제할 수 있다', () => {
		const arr = [1, { a: 2 }, [3, 4]];

		const clone = cloneDeep(arr);
		expect(clone).toStrictEqual(arr);

		arr[0] = 2;
		expect(clone[0]).toBe(1);
	});
});
