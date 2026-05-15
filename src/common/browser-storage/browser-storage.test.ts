import {
	BrowserStorage,
	type BrowserStorageMapper,
} from './browser-storage.js';
import { BrowserStorageType } from './constants.js';

describe('BrowserStorage', () => {
	const MODEL_STORAGE_KEY = 'model';

	class Model {
		id: string;
		text: string;

		constructor(id: string, text: string) {
			this.id = id;
			this.text = text;
		}
	}

	class ModelMapper implements BrowserStorageMapper<Model> {
		fromJson(json: Model): Model | null {
			if (json === null) return null;
			return new Model(json.id, json.text);
		}
		toJson(target: Model): Model {
			return {
				id: target.id,
				text: target.text,
			};
		}
	}

	beforeEach(() => {
		if (typeof localStorage === 'undefined') {
			const storage: Record<string, string> = {};
			vi.stubGlobal('localStorage', {
				getItem: (key: string) => storage[key] || null,
				setItem: (key: string, value: string) => {
					storage[key] = value;
				},
				removeItem: (key: string) => {
					delete storage[key];
				},
				clear: () => {
					for (const key in storage) {
						delete storage[key];
					}
				},
			});
		}
	});

	afterEach(() => {
		if (typeof localStorage !== 'undefined') {
			localStorage.clear();
		}
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.clear();
		}
		vi.unstubAllGlobals();
	});

	test('`Model` 데이터를 localStorage에 저장할 수 있다', () => {
		const ModelStorage = new BrowserStorage(
			MODEL_STORAGE_KEY,
			new ModelMapper(),
		);
		ModelStorage.set({ id: '1', text: 'test' });
		expect(ModelStorage.get()).toEqual(new Model('1', 'test'));
	});

	test('`Model` 데이터를 localStorage에서 지울 수 있다', () => {
		const ModelStorage = new BrowserStorage(
			MODEL_STORAGE_KEY,
			new ModelMapper(),
		);
		ModelStorage.set({ id: '1', text: 'test' });
		ModelStorage.clear();
		expect(ModelStorage.get()).toBeNull();
	});

	test('`Model` 데이터를 sessionStorage에 저장할 수 있다', () => {
		const ModelStorage = new BrowserStorage(
			MODEL_STORAGE_KEY,
			new ModelMapper(),
			BrowserStorageType.sessionStorage,
		);
		ModelStorage.set({ id: '1', text: 'test' });
		expect(ModelStorage.get()).toEqual(new Model('1', 'test'));
	});

	test('`Model` 데이터를 sessionStorage에 지울 수 있다', () => {
		const ModelStorage = new BrowserStorage(
			MODEL_STORAGE_KEY,
			new ModelMapper(),
			BrowserStorageType.sessionStorage,
		);
		ModelStorage.set({ id: '1', text: 'test' });
		ModelStorage.clear();
		expect(ModelStorage.get()).toBeNull();
	});

	describe('BrowserStorage in "Server" environment', () => {
		beforeEach(() => {
			vi.stubGlobal('window', undefined);
			vi.spyOn(console, 'warn').mockImplementation(() => {});
		});

		afterEach(() => {
			vi.unstubAllGlobals();
			vi.restoreAllMocks();
		});

		test('서버사이드 환경에서는 console.warn의 출력과 함께 get() 메서드가 null을 반환한다', () => {
			const ModelStorage = new BrowserStorage(
				MODEL_STORAGE_KEY,
				new ModelMapper(),
			);
			const result = ModelStorage.get();

			expect(result).toBeNull();
			expect(console.warn).toHaveBeenCalledWith(
				'BrowserStorage is not available on server-side.',
			);
		});
	});
});
