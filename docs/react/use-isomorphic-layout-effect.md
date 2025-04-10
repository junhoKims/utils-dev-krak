# useIsomorphicLayoutEffect

클라이언트에서는 `useLayoutEffect`를, 서버에서는 `useEffect`를 리턴하는 Effect Hook

## example

```tsx
import { useIsomorphicLayoutEffect } from '@krakstack/utils/react';

const Comp = () => {
  // 클라이언트 환경에서
  useIsomorphicLayoutEffect(() => {
    // useLayoutEffect
    console.log('window: ', window); // Window
  }, []);

  // 서버 환경에서
  useIsomorphicLayoutEffect(() => {
    // useEffect
    console.log('window: ', window); // undefined
  }, []);

  return <div>UI</div>;
};
```
