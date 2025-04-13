/**
 * 브라우저 환경에서 로컬 스토리지를 안전하게 사용할 수 있는 유틸 함수
 *
 * @example
 * // 값 저장하기
 * localStorage.setItem('user', { name: 'John' });
 *
 * // 값 가져오기
 * const user = localStorage.getItem<{ name: string }>('user');
 *
 * // 값 삭제하기
 * localStorage.removeItem('user');
 *
 * // 모든 값 삭제하기
 * localStorage.clear();
 */
export const localStorage = {
	setItem: (key: string, value: any) => {
		if (typeof window === 'undefined') {
			console.warn(
				'utils-dev-krak: "localStorage" is not available in this environment',
			);
			return;
		}

		window.localStorage.setItem(key, JSON.stringify(value));
	},
	getItem: <T>(key: string): T | null => {
		if (typeof window === 'undefined') {
			console.warn(
				'utils-dev-krak: "localStorage" is not available in this environment',
			);
			return null;
		}

		try {
			return JSON.parse(window.localStorage.getItem(key) || 'null');
		} catch (error) {
			console.error('utils-dev-krak: "localStorage" parsing error value');
			return null;
		}
	},
	removeItem: (key: string) => {
		if (typeof window === 'undefined') {
			console.warn(
				'utils-dev-krak: "localStorage" is not available in this environment',
			);
			return;
		}

		window.localStorage.removeItem(key);
	},
	clear: () => {
		if (typeof window === 'undefined') {
			console.warn(
				'utils-dev-krak: "localStorage" is not available in this environment',
			);
			return;
		}
		window.localStorage.clear();
	},
	length: typeof window === 'undefined' ? 0 : window.localStorage.length,
};
