# combineRefs

props로 받은 ref와 내부에서 쓰일 ref를 합쳐주는 함수

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| refs | `React.ForwardedRef<T>` | 합치고자 하는 ref 배열 |

## example

```tsx
import { combineRefs } from 'utils-dev-krak/react';
import { forwardRef, useRef } from 'react';

const Comp = forwardRef<HTMLDivElement>((_, ref) => {
  const innerRef = useRef<HTMLDivElement>(null);
  
  // innerRef와 외부에서 전달된 ref가 같은 요소를 참조하도록 함
  return <div ref={combineRefs(ref, innerRef)}>Test</div>;
});
```
