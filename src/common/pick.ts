import { objectKeys } from '@/common/object-keys.js';

/**
 * 지정한 key만을 포함한 키-값쌍을 반환하는 유틸 함수
 *
 * @example
 * const picked1 = pick({ A: 'A', B: 'B' }, []); // => {}
 * const picked2 = pick({ A: 'A', B: 'B' }, ['A']); // => { A: 'A' }
 */
export const pick = <
	TObj extends Record<PropertyKey, any>,
	TKeys extends ObjectKeys<TObj>[],
>(
	obj: TObj,
	keys: TKeys,
) => {
	return objectKeys(obj)
		.filter((key): key is Extract<TObj, TKeys[number]> => keys.includes(key))
		.reduce(
			(acc, cur) => {
				acc[cur] = obj[cur];
				return acc;
			},
			{} as Pick<typeof obj, TKeys[number]>,
		);
};
