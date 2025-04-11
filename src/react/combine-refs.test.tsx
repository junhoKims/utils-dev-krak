import { combineRefs } from '@/react/combine-refs.js';
import { act, render } from '@testing-library/react';
import { createRef, forwardRef, useEffect, useRef } from 'react';

describe('combineRefs', () => {
	let innerRefValue: HTMLDivElement | null;
	let mockRef: React.RefObject<HTMLDivElement>;

	const Comp = forwardRef<HTMLDivElement>((_, ref) => {
		const innerRef = useRef<HTMLDivElement>(null);

		useEffect(() => {
			innerRefValue = innerRef.current;
		}, []);

		return <div ref={combineRefs(ref, innerRef)}>Test</div>;
	});
	Comp.displayName = 'Comp';

	beforeEach(() => {
		mockRef = createRef<HTMLDivElement>();
		innerRefValue = null;
	});

	test('인자의 ref가 동일한 요소를 참조한다', () => {
		expect(mockRef.current).toBeNull();

		act(() => {
			render(<Comp ref={mockRef} />);
		});

		expect(mockRef.current).not.toBeNull();
		expect(innerRefValue).not.toBeNull();
		expect(mockRef.current).toStrictEqual(innerRefValue);
	});
});
