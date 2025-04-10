/**
 * 호출된 환경이 클라이언트 환경인지 여부를 반환
 */
export const getIsClient = () => {
	return typeof globalThis.window !== 'undefined';
};
