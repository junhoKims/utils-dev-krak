import { pick } from '@/common/pick.js';

describe('pick', () => {
	test('첫번째 인자의 객체에서 두번째 인자의 key를 포함한 객체를 반환한다', () => {
		const DUMP = { A: 'A', B: 'B', C: 'C' };
		expect(pick(DUMP, [])).toStrictEqual({});
		expect(pick(DUMP, ['A'])).toStrictEqual({ A: 'A' });
		expect(pick(DUMP, ['A', 'B', 'C'])).toStrictEqual({
			A: 'A',
			B: 'B',
			C: 'C',
		});
	});
});
