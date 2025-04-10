# utils-dev-krak

typescript로 작성된 react를 위한 유틸리티 함수 패키지

## 조건

아래와 같은 라이브러리 버전을 충족해야 합니다.

```json
react@>=18.2.0
react-dom@>=18.2.0 
@types/react@>=18.2.0
@types/react-dom@>=18.2.0
typescript@>=5.7.2
```

## 사용

명령어를 통해 패키지를 설치합니다.

```json
pnpm add utils-dev-krak
```

아래와 같이 import하여 사용합니다.

```ts
import { sum } from 'utils-dev-krak/common';

function func() {
  const total = sum(1,2,3);
  return total;
}
```

## 기능

문서링크 예정
