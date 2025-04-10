import { renderHook } from '@testing-library/react';
import { useEffect, useLayoutEffect } from 'react';
import * as clientUtils from '../common/get-is-client.js';

vi.mock('react', async () => ({
	...(await vi.importActual('react')),
	useEffect: vi.fn(),
	useLayoutEffect: vi.fn(),
}));

describe('useIsomorphicLayoutEffect', () => {
	const spyGetIsClient = vi.spyOn(clientUtils, 'getIsClient');

	afterEach(() => {
		vi.resetModules();
		vi.restoreAllMocks();
	});

	describe('Server Environment', () => {
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
	});

	describe('Client Environment', () => {
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
});

// vi.mock('react', async () => ({
//   ...(await vi.importActual('react')),
//   useEffect: vi.fn(),
//   useLayoutEffect: vi.fn(),
// }));

// describe('useIsomorphicLayoutEffect, 서버', () => {
//   const spyGetIsClient = vi.spyOn(clientUtils, 'getIsClient');

//   test('`window`가 존재하지 않는 서버 환경에서 useEffect로 동작', async () => {
//     spyGetIsClient.mockReturnValue(false);

//     const { useIsomorphicLayoutEffect } = await import('./use-isomorphic-layout-effect.js');
//     renderHook(() => {
//       useIsomorphicLayoutEffect(() => {
//         /* INNER EFFECT */
//       }, []);
//     });

//     expect(useEffect).toHaveBeenCalledTimes(1);
//     expect(useLayoutEffect).toHaveBeenCalledTimes(0);
//   });
// });

// describe('useIsomorphicLayoutEffect, 클라이언트', () => {
//   const spyGetIsClient = vi.spyOn(clientUtils, 'getIsClient');

//   test('`window`가 존재하는 클라이언트 환경에서 useLayoutEffect로 동작', async () => {
//     spyGetIsClient.mockReturnValue(true);

//     const { useIsomorphicLayoutEffect } = await import('./use-isomorphic-layout-effect.js');
//     renderHook(() => {
//       useIsomorphicLayoutEffect(() => {
//         /* INNER EFFECT */
//       }, []);
//     });

//     expect(useLayoutEffect).toHaveBeenCalledTimes(1);
//     expect(useEffect).toHaveBeenCalledTimes(0);
//   });
// });
