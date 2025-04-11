/**
 * 객체나 배열을 인자로 받아 깊게 복제하는 유틸 함수
 *
 * @example
 * ```ts
 * const obj = { user: { role: 'admin', id: '123' } };
 * const clone = cloneDeep(obj);
 * clone.user.role = 'hello';
 *
 * expect(clone.user.role).toBe('hello');
 * ```
 */
export const cloneDeep = <T>(obj: T): T => {
	if (typeof obj !== 'object' || obj === null || typeof obj === 'function') {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map((v) => cloneDeep(v) as T) as T;
	}

	return Object.entries(obj).reduce((acc, [key, value]) => {
		return {
			...acc,
			[key]: cloneDeep(value) as T,
		};
	}, {} as T);
};
