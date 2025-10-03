# slugify

인자로 받은 문자열의 좌우 공백, 특수문자 등을 제거하고 문자열간 공백을 '-'로 치환해주는 유틸 함수

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| str | string | 치환하려는 문자열 |

## example

```ts
slugify('Hello World') // 'hello-world'
slugify('Hello+World') // 'helloworld'
slugify('utils-Dev-krak') // 'utils-dev-krak'
```
