# pick

지정한 key만을 포함한 키-값쌍을 반환하는 유틸 함수

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| obj | `TObj extends Record<PropertyKey, any>` | 객체 |
| keys | `TKeys extends ObjectKeys<TObj>[]` | 포함할 키 배열 |

## example

```ts
const picked1 = pick({ A: 'A', B: 'B' }, []); // => {}
const picked2 = pick({ A: 'A', B: 'B' }, ['A']); // => { A: 'A' }
```
