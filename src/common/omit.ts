import { objectKeys } from '@/common/object-keys.js';

/**
 * 지정한 key를 제외한 키-값쌍을 반환하는 유틸 함수
 *
 * @example
 * const omitted1 = omit({ A: 'A', B: 'B' }, ['A']); // => { B: 'B' }
 * const omitted2 = omit({ A: 'A', B: 'B' }, []); // => { A: 'A', B: 'B' }
 */
export const omit = <
	TObj extends Record<PropertyKey, any>,
	TKeys extends ObjectKeys<TObj>[],
>(
	obj: TObj,
	keys: TKeys,
) => {
	return objectKeys(obj)
		.filter(
			(key): key is Exclude<ObjectKeys<TObj>, TKeys[number]> =>
				!keys.includes(key),
		)
		.reduce(
			(acc, cur) => {
				acc[cur] = obj[cur];
				return acc;
			},
			{} as Omit<TObj, TKeys[number]>,
		);
};
