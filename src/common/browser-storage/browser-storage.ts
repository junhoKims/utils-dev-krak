import { BrowserStorageType } from './constants.js';

/**
 * 하나의 Data Model을 제어하는 로컬스토리지 | 세션스토리지 클래스
 */
export class BrowserStorage<TKey, TValue> {
	private key: TKey;
	private mapper: BrowserStorageMapper<TValue>;
	private storageType: BrowserStorageType;

	constructor(
		key: TKey,
		mapper: BrowserStorageMapper<TValue>,
		storageType?: BrowserStorageType,
	) {
		this.key = key;
		this.mapper = mapper;
		this.storageType = storageType ?? BrowserStorageType.localStorage;
	}

	/**
	 * 스토리지에 저장된 Data Model을 mapper를 통해 파싱 후 반환
	 */
	get(): TValue | null {
		return this.mapper.fromJson(
			BrowserStorageHelper.get(this.key, this.storageType),
		);
	}

	/**
	 * Data Model을 받아 mapper를 통해 파싱 후 스토리지에 저장
	 */
	set(target: TValue) {
		BrowserStorageHelper.set(
			this.key,
			this.mapper.toJson(target),
			this.storageType,
		);
	}

	/**
	 * 저장된 Data Model을 스토리지에서 삭제
	 */
	clear() {
		BrowserStorageHelper.clear(this.key, this.storageType);
	}
}

/**
 * BrowserStorage와 Data Model을 처리하는 매퍼 인터페이스
 */
export interface BrowserStorageMapper<TValue> {
	fromJson(json: any): TValue | null;
	toJson(target: TValue): any;
}

/**
 * BrowserStorage 클래스에서 key와 매핑된 Data Model을 받아 실제 스토리지에 접근하는 헬퍼 클래스
 */
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class BrowserStorageHelper {
	static get<T>(key: T, storageType: BrowserStorageType): any {
		const storage = getStorage(storageType);
		const item = storage.getItem(String(key));
		return item ? JSON.parse(item) : null;
	}

	static set<T>(key: T, value: any, storageType: BrowserStorageType): void {
		const storage = getStorage(storageType);
		storage.setItem(String(key), JSON.stringify(value));
	}

	static clear<T>(key: T, storageType: BrowserStorageType): void {
		const storage = getStorage(storageType);
		storage.removeItem(String(key));
	}
}

const getStorage = (storageType: BrowserStorageType) => {
	if (typeof window === 'undefined') {
		console.warn('BrowserStorage is not available on server-side.');

		return {
			getItem: () => null,
			setItem: () => {},
			removeItem: () => {},
		} as unknown as Storage;
	}

	return storageType === BrowserStorageType.localStorage
		? localStorage
		: sessionStorage;
};
