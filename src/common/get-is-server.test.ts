import { getIsServer } from './get-is-server.js';

describe('getIsServer', () => {
	const originalWindow = globalThis.window;

	afterEach(() => {
		globalThis.window = originalWindow;
	});

	it('window가 undefined인 서버 환경에서 false를 반환', () => {
		expect(getIsServer()).toBe(false);
	});

	it('window가 존재하는 클라이언트 환경에서 true를 반환', () => {
		(globalThis.window as Window | undefined) = undefined;
		expect(getIsServer()).toBe(true);
	});
});
