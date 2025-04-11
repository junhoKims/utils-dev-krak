# withComma

숫자 또는 숫자로만 이루어진 문자열을 받아 콤마(comma)와 함께 문자열 반환

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| value | `string \| number` | 변경하려는 문자열 또는 숫자 |

## example

```ts
withComma('123,456,7') // '1,234,567'
withComma(-1234567) // '-1,234,567'
```
