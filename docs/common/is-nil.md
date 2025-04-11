# isNil

대상이 `null` 또는 `undefined`인지 쉽게 찾아주는 유틸 함수

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| value | `unknown` | 확인할 값 |

## example

```ts
isNil(null); // true
isNil(undefined); // true
isNil('test'); // false
```
