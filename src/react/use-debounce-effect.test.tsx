import { useDebounceEffect } from '@/react/use-debounce-effect.js';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { vi } from 'vitest';

describe('useDebounceEffect', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
	});

	const BUTTON_TEST_ID = 'test-btn';
	const BUTTON_TEXT_TEST_ID = 'test-show-text';

	const Comp = () => {
		const [count, setCount] = useState(0);
		const [showsText, setShowsText] = useState(false);

		useDebounceEffect(
			() => {
				setShowsText(count > 0);
			},
			[count],
			200,
		);

		return (
			<div>
				<button
					data-testid={BUTTON_TEST_ID}
					type="button"
					onClick={() => {
						setCount((prev) => prev + 1);
					}}
				>
					click
				</button>
				{showsText && <div data-testid={BUTTON_TEXT_TEST_ID}>SHOW</div>}
			</div>
		);
	};

	test('useDebounceEffect의 callback이 0.2초 이후 실행된다', () => {
		render(<Comp />);

		fireEvent.click(screen.getByTestId(BUTTON_TEST_ID));

		act(() => {
			vi.advanceTimersByTime(100);
		});
		expect(screen.queryByTestId(BUTTON_TEXT_TEST_ID)).not.toBeInTheDocument();

		act(() => {
			vi.advanceTimersByTime(200);
		});
		expect(screen.queryByTestId(BUTTON_TEXT_TEST_ID)).toBeInTheDocument();
	});
});
