# useDebounceEffect

`debounce` 기능이 적용된 Effect Hook

## arguments

| 이름 | 타입 | 설명 |
| --- | --- | --- |
| func | `(...args: any[]) => any` | 실행할 콜백 함수 |
| deps | `React.DependencyList` | 의존성 배열 (선택, 기본값: `[]`) |
| delay | `number` | 디바운스 지연 시간 (밀리초, 선택, 기본값: `1000`) |

## example

```tsx
import { useDebounceEffect } from 'utils-dev-krak/react';
import { useState } from 'react';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useDebounceEffect(
    () => {
      // searchTerm이 변경된 후 200ms 후에 검색 실행
      fetchSearchResults(searchTerm).then(setResults);
    },
    [searchTerm],
    200
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어 입력..."
      />
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};
```
