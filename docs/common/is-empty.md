# isEmpty

대상이 비어있는지(빈 배열, 빈 객체, 빈 문자열 등등) 찾아주는 유틸 함수

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| value | `unknown` | 확인할 값 |

## example

```ts
isEmpty([]); // true
isEmpty({}); // true
isEmpty(''); // true
isEmpty('test'); // false
```
