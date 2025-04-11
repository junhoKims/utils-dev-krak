import { getIsClient } from '@/common/get-is-client.js';

/**
 * 호출된 환경이 서버 환경인지 여부를 반환
 */
export const getIsServer = () => {
	return !getIsClient();
};
