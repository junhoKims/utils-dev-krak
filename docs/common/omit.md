# omit

지정한 key를 제외한 키-값쌍을 반환하는 유틸 함수

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| obj | `TObj extends Record<PropertyKey, any>` | 객체 |
| keys | `TKeys extends ObjectKeys<TObj>[]` | 제외할 키 배열 |

## example

```ts
const omitted1 = omit({ A: 'A', B: 'B' }, ['A']); // => { B: 'B' }
const omitted2 = omit({ A: 'A', B: 'B' }, []); // => { A: 'A', B: 'B' }
```
