/**
 * Web Storage Type (로컬스토리지 | 세션스토리지)
 */
export type BrowserStorageType = 'localStorage' | 'sessionStorage';

/**
 * Web Storage Type (로컬스토리지 | 세션스토리지)
 */
export const BrowserStorageType = {
	localStorage: 'localStorage',
	sessionStorage: 'sessionStorage',
} as const;
