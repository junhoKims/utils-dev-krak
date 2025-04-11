import { omit } from '@/common/omit.js';

describe('omit', () => {
	test('두번째 인자의 key를 제외한 객체를 반환한다', () => {
		const DUMP = { A: 'A', B: 'B', C: 'C' };

		expect(omit(DUMP, [])).toEqual({ A: 'A', B: 'B', C: 'C' });
		expect(omit(DUMP, ['A'])).toEqual({ B: 'B', C: 'C' });
		expect(omit(DUMP, ['A', 'B', 'C'])).toEqual({});
	});
});
