# getIsClient

호출된 환경이 클라이언트 환경인지 여부를 반환

## example

```tsx
import { getIsClient } from '@krakstack/utils/commons'

const Comp = () => {
  useEffect(() => {
    const client = getIsClient();
    console.log(client); // true
  }, [])

  return <div>UI</div>
}
```
