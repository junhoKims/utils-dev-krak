# createSafeContext

영역 내 Provider 존재 여부와 상관없이 확정된 타입을 가지는 Context 생성 함수

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| T | `any` | Context가 저장할 데이터 타입 |

## returns

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| useRequiredContext | `() => T` | Context 값을 반환하는 훅, Provider가 없으면 에러 발생 |
| Provider | `React.Provider<T \| null>` | Context Provider 컴포넌트 |

## example

```tsx
import { createSafeContext } from 'utils-dev-krak/react';

// Context 생성
const [useUser, UserProvider] = createSafeContext<{
  name: string;
}>();

// Provider 사용
const App = () => {
  return (
    <UserProvider value={{ name: 'krak' }}>
      <User />
    </UserProvider>
  );
};

// Consumer 사용
const User = () => {
  const user = useUser(); // { name: string } 타입 보장
  return <div>{user.name}</div>;
};
```
