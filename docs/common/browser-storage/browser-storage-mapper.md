# BrowserStorageMapper

BrowserStorage와 Data Model을 처리하는 매퍼 인터페이스

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| fromJson | `(json: any) => TValue \| null` | 실제 사용할 데이터로 파싱하는 함수 |
| toJson | `(target: TValue) => any` | 스토리지에 저장할 데이터로 파싱하는 함수 |

## example

원시 타입 Mapper 클래스 구현

```ts
import type { BrowserStorageMapper } from 'utils-dev-krak/common';

class CountWrapper implements BrowserStorageMapper<number> {
  fromJson(json: number): number | null {
    if (json === null) return null;
    return json;
  }

  toJson(target: number): number {
    return target;
  }
}
```

Model 클래스에 대한 Mapper 클래스 구현

```ts
class ModelMapper implements BrowserStorageMapper<Model> {
  fromJson(json: Model): Model | null {
    if (json === null) return null;
    return new Model(json.id, json.name);
  }

  toJson(target: Model): Model {
    return { id: target.id, name: target.name };
  }
}
```
