# cloneDeep

객체나 배열을 인자로 받아 깊게 복제하는 유틸 함수

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| obj | `T` | 복제할 객체 또는 배열 |

## example

```ts
const obj = { user: { role: 'admin', id: '123' } };
const clone = cloneDeep(obj);
clone.user.role = 'hello';

console.log(obj.user.role); // 'admin'
```
