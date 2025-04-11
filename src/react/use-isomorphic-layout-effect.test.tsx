import * as clientUtils from '@/common/get-is-client.js';
import { renderHook } from '@testing-library/react';
import { useEffect, useLayoutEffect } from 'react';
import type { MockInstance } from 'vitest';

vi.mock('react', async () => ({
	...(await vi.importActual('react')),
	useEffect: vi.fn(),
	useLayoutEffect: vi.fn(),
}));

describe('useIsomorphicLayoutEffect', () => {
	let spyGetIsClient: MockInstance;

	beforeEach(() => {
		spyGetIsClient = vi.spyOn(clientUtils, 'getIsClient');
	});

	afterEach(() => {
		vi.resetModules();
		vi.restoreAllMocks();
	});

	test('서버 환경에서 `useEffect`로 동작', async () => {
		spyGetIsClient.mockReturnValue(false);

		const { useIsomorphicLayoutEffect } = await import(
			'./use-isomorphic-layout-effect.js'
		);
		renderHook(() => {
			useIsomorphicLayoutEffect(() => {
				/* INNER EFFECT */
			}, []);
		});

		expect(useEffect).toHaveBeenCalledTimes(1);
		expect(useLayoutEffect).toHaveBeenCalledTimes(0);
	});

	test('클라이언트 환경에서 `useLayoutEffect`로 동작', async () => {
		spyGetIsClient.mockReturnValue(true);

		const { useIsomorphicLayoutEffect } = await import(
			'./use-isomorphic-layout-effect.js'
		);
		renderHook(() => {
			useIsomorphicLayoutEffect(() => {
				/* INNER EFFECT */
			}, []);
		});

		expect(useLayoutEffect).toHaveBeenCalledTimes(1);
		expect(useEffect).toHaveBeenCalledTimes(0);
	});
});
