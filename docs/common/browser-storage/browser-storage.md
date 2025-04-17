# BrowserStorage

하나의 Data Model을 제어하는 로컬스토리지 | 세션스토리지 클래스

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| key | `TKey extends string` | 스토리지에 저장할 key |
| mapper | `BrowserStorageMapper<TValue>` | 스토리지에 저장할 데이터의 mapper 클래스 인스턴스 |
| storageType | `BrowserStorageType` | 스토리지 타입 (세션스토리지 \| 로컬스토리지) |

## example

원사타입 데이터를 관리하는 Storage

```ts
import { BrowserStorage } from 'utils-dev-krak/common';
import type { BrowserStorageMapper } from 'utils-dev-krak/common';

/**
 * Mapper 클래스를 구현해줍니다.
 */
class CountWrapper implements BrowserStorageMapper<number> {
  fromJson(json: number): number | null {
    if (json === null) return null;
    return json;
  }

  toJson(target: number): number {
    return target;
  }
}

const CountStorageKey = 'count';
const CountStorage = new BrowserStorage(CountStorageKey, new CountWrapper());

CountStorage.set(0));
CountStorage.get(); // 0
CountStorage.set(1);
CountStorage.get(); // 1
```

Data Model 클래스를 관리하는 Storage

```ts
import { BrowserStorage } from 'utils-dev-krak/common';
import type { BrowserStorageMapper } from 'utils-dev-krak/common';

class Model {
  id: number;
  name: string;
}

/**
 * Mapper 클래스를 구현해줍니다.
 */
class ModelMapper implements BrowserStorageMapper<Model> {
  fromJson(json: Model): Model | null {
    if (json === null) return null;
    return new Model(json.id, json.name);
  }

  toJson(target: Model): Model {
    return { id: target.id, name: target.name };
  }
}

const ModelStorageKey = 'model';
const ModelStorage = new BrowserStorage(ModelStorageKey, new ModelMapper());

ModelStorage.set({ id: 1, name: 'man' });
ModelStorage.get(); // { id: 1, name: 'man' }
```

세션스토리지에서 관리하기

```ts
import { BrowserStorage, BrowserStorageType } from 'utils-dev-krak/common';
import type { BrowserStorageMapper } from 'utils-dev-krak/common';

/**
 * Mapper 클래스를 구현해줍니다.
 */
class CountWrapper implements BrowserStorageMapper<number> {
  fromJson(json: number): number | null {
    if (json === null) return null;
    return json;
  }

  toJson(target: number): number {
    return target;
  }
}

/**
 * 세번째 인자에 `BrowserStorageType.sessionStorage`를 추가 
 */
const CountStorageKey = 'count';
const CountStorage = new BrowserStorage(CountStorageKey, new CountWrapper(), BrowserStorageType.sessionStorage);

CountStorage.set(0);
CountStorage.get(); // 0
CountStorage.set(1);
CountStorage.get(); // 1
```
