# sum

인자로 받은 숫자를 더한 값을 반환하는 유틸 함수

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| ...args | `number \| number[] \| Record<string \| number>` | 더할 값들의 배열 |

## example

```ts
sum(1); // 1
sum(1, 2); // 3
sum({ a: 1, b: 2, c: 3 }); // 6
sum(...[1, 2, 3]); // 6
sum([1, 2, 3], [1, 2]); // 9
sum(1, { a: 1, b: 2 }, [1, 2]); // 7
```
