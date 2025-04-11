# flatten

배열을 인자로 받은 depth만큼 평탄화시키는 유틸 함수

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| arr | `(T \| T[])[]` | 평탄화할 배열 |
| depth | number = Number.POSITIVE_INFINITY | 평탄화할 깊이 |

## example

```ts
flatten(1, [2, 3], [4, [5, 6]]) // [1, 2, 3, 4, 5, 6]
flatten([1, [2, [3, [4]]]], 2) // [1, 2, 3, [4]]
flatten([1, [], [2, []], []]) // [1, 2]
```
