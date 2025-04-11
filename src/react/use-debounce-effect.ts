import { useIsomorphicLayoutEffect } from '@/react/use-isomorphic-layout-effect.js';
import { useCallback } from 'react';

type UseDebounceEffect = <T extends (...args: any[]) => any>(
	/** 콜백 함수 */
	func: T,
	/** 의존성 배열 */
	deps?: React.DependencyList,
	/** 디바운스 지연 시간 */
	delay?: number,
) => void;

/**
 * `deboucne` 기능이 적용된 Effect Hook
 *
 * @example
 * ```tsx
 * useDebounceEffect(() => {
 *   console.log('debounce');
 * }, [count], 200);
 * ```
 */
export const useDebounceEffect: UseDebounceEffect = <
	T extends (...args: any[]) => any,
>(
	func: T,
	deps: React.DependencyList = [],
	delay = 1000,
) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const callback = useCallback(func, deps);

	useIsomorphicLayoutEffect(() => {
		const timeout = setTimeout(() => {
			callback();
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [callback, delay]);
};
