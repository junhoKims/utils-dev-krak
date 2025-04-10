# React

`React` 문서를 소개합니다 🎉

이 섹션에는 react를 기반으로 한 hook과 유틸함수들을 찾아볼 수 있습니다.

(react 18.2.0 이상부터 지원합니다.)

## 사용

좌측 사이드바에서 함수를 확인하실 수 있습니다.

아래와 같이 모듈을 import 할 수 있습니다.

```tsx
import { useDebounceEffect } from 'utils-dev-krak/react';

const Comp = () => {
  const [count, setCount] = useState(0);

  useDebounceEffect(() => {
    console.log('debounce');
  }, [count], 200);

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => setCount((prev) => prev + 1)}>
        증가
      </button>
    </div>
  );
};
```

## 궁금한 점이 있나요? 🐛

궁금한 점이나 버그를 제보하고 싶으신가요?

이 ([link](https://github.com/junhoKims/utils-dev-krak/issues))를 통해서 질문과
버그를 제보해주세요. 감사합니다 💚
