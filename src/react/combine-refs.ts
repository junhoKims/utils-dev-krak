/**
 * ### `combineRefs`
 *
 * props로 받은 ref와 내부에서 쓰일 ref를 합쳐주는 함수
 *
 * @example
 * const internalRef = useRef<HTMLDivElement>(null);
 * <div ref={combineRefs(externalRef, internalRef)} />
 */
export const combineRefs = <T>(...refs: React.ForwardedRef<T>[]) => {
	return (node: T) => {
		for (const ref of refs) {
			if (ref && typeof ref !== 'function') {
				ref.current = node;
			}
		}
	};
};
