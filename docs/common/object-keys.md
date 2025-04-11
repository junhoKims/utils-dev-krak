# objectKeys

`Object.keys`의 결과에 대한 타입 안전성을 보장하는 유틸 함수

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| value | `T extends Record<PropertyKey, any>` | 키를 추출할 객체 |

## example

```ts
const keys = objectKeys({ A: 'A', B: 'B' }); // => ['A', 'B']
``` 
