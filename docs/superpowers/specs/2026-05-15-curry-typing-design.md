# curry 함수 검토 및 TypeScript 추론 설계

- 일자: 2026-05-15
- 대상 파일: `src/common/curry.ts`, `src/common/curry.test.ts`, `src/common/index.ts`
- 작성: brainstorming 세션 결과

## 1. 목표

1. 현재 자바스크립트로 작성된 `curry` 함수를 검토하고 발견된 문제를 수정한다.
2. 호출 단계마다 인자 타입과 반환 타입이 정확히 추론되도록 TypeScript 시그니처를 도입한다.
3. 런타임/타입 양쪽 모두 회귀 방지가 가능한 테스트로 보강한다.

## 2. 검토 결과 (현 상태 문제점)

| # | 문제 | 영향 |
|---|---|---|
| 1 | 모든 매개변수와 반환값이 `any`로 추론됨 | 라이브러리 사용자가 타입 보호를 받지 못함 |
| 2 | `curry.test.ts`에 실제 assertion 없이 `console.debug` 출력만 존재 | 회귀 방지 불가 |
| 3 | `src/common/index.ts`에서 export되지 않음 | 빌드 산출물에 포함되지 않아 외부에서 import 불가 |
| 4 | `fn.length`만으로 도착 여부를 판별 | 기본값/rest 파라미터가 있는 함수는 부정확 (JS curry의 본질적 한계) |
| 5 | JSDoc 닫힘 누락, `at lint:` / `dbug` 등 오타 | 문서 품질 저하 |

## 3. 설계 결정

### 3.1 호출 시그니처 — 엄격한 단항 커링 (옵션 A)

`curry(fn)(a)(b)(c)` 형태로 **한 번에 하나의 인자**만 받는다. 다인자 부분 적용(`fn(a, b)(c)`)은 더 이상 지원하지 않는다.

**근거:**
- 함수형 프로그래밍 정의에 가장 부합
- 타입 추론이 깔끔한 재귀 conditional type 하나로 표현 가능
- 다인자 부분 적용은 `pipe`/`compose`로 충분히 대체 가능

### 3.2 타입 시그니처

```ts
type Curried<P extends readonly unknown[], R> =
  P extends readonly [infer Head, ...infer Tail]
    ? Tail extends readonly []
      ? (arg: Head) => R
      : (arg: Head) => Curried<Tail, R>
    : never;

export function curry<P extends readonly unknown[], R>(
  fn: (...args: P) => R,
): Curried<P, R>;
```

- 가변 튜플 `[infer Head, ...infer Tail]`로 인자 수에 비례하는 재귀만 사용 → 약 20+ arity 안전
- 0-인자 함수는 `never`로 매핑 → 타입 레벨에서 호출 불가

### 3.3 런타임 구현

```ts
export function curry<P extends readonly unknown[], R>(
  fn: (...args: P) => R,
): Curried<P, R> {
  if (typeof fn !== 'function') {
    throw new TypeError('curry: argument must be a function');
  }

  const collect = (collected: unknown[]): unknown =>
    collected.length >= fn.length
      ? fn(...(collected as unknown as P))
      : (arg: unknown) => collect([...collected, arg]);

  return collect([]) as Curried<P, R>;
}
```

**포인트:**
- `collect`는 누적 배열을 받아 다음 단항 함수를 반환하거나, 도착하면 `fn(...)` 호출
- `[...collected, arg]`로 매 단계 새 배열을 만들어 같은 부분 적용 함수를 두 번 사용해도 상태가 섞이지 않음 (immutability)
- 에러 타입은 `Error` → `TypeError` (의미 정렬)
- 내부에서만 `as unknown as P` 단언 1회 사용, 외부 시그니처는 완전히 타입 안전

### 3.4 JSDoc 재작성

```ts
/**
 * 다항 함수를 단항 함수들의 체인으로 변환하는 커링 함수.
 * 인자는 한 번에 하나씩만 전달해야 하며, 모든 인자가 채워지면 원본 함수가 호출됩니다.
 *
 * @param fn 커링할 함수 (1개 이상의 인자를 받는 함수)
 * @returns 단항 함수들의 체인
 * @throws {TypeError} fn이 함수가 아닐 때
 *
 * @example
 * // 예제 1 — 4-인자 함수
 * function logger(mode: string, initMsg: string, errMsg: string, lineNo: number) {
 *   console.debug(mode, initMsg, errMsg + ' at line: ' + lineNo);
 * }
 * const debugLogger = curry(logger)('DEBUG')('Init Debug Error');
 * debugLogger('debug show')(21);
 *
 * @example
 * // 예제 2 — 2-인자 함수
 * const matched = curry((expr: RegExp, str: string) => str.match(expr));
 * const hasNumber = matched(/[0-9]+/);
 * hasNumber('js1'); // ['1']
 *
 * @remarks
 * 기본값/rest 파라미터가 있는 함수는 `fn.length`가 실제 인자 수와 다를 수 있어
 * 의도대로 동작하지 않을 수 있습니다.
 */
```

### 3.5 테스트 보강 (런타임 + 타입)

**런타임 (`expect`):**
- 2-인자 함수: 단계별 부분 적용과 최종 결과 검증
- 4-인자 함수: `vi.fn()`으로 호출 인자/순서 검증
- 비함수 입력 → `TypeError`
- 같은 1차 부분 적용 함수를 두 번 사용해도 결과가 독립적인지 (immutability)

**타입 (`expectTypeOf`):**
- `curry((a: number, b: string) => boolean)`의 1단계 반환: `(a: number) => (b: string) => boolean`
- 마지막 호출 반환: `boolean`
- 잘못된 타입의 인자 전달이 컴파일 에러를 일으키는지 `@ts-expect-error`로 검증
  (예: 첫 단계 인자 자리에 `string`을 전달, 마지막 단계에 잘못된 인자 전달)

### 3.6 라이브러리 export

`src/common/index.ts`에 알파벳 순을 따라 한 줄 추가:

```ts
export * from './curry.js';
```

## 4. 비범위 (Out of Scope)

- 다인자 부분 적용 (`fn(a, b)(c)`) 재지원 — 의도적으로 제외 (3.1 근거 참고)
- 기본값/rest 파라미터를 가진 함수의 정확한 arity 추론 — JS curry의 본질적 한계로, 별도 API(예: `curryN(n, fn)`)가 필요해 스코프가 커짐
- 0-인자 함수 입력 — 타입 레벨에서 `never`로 호출이 막히며, 런타임 가드는 추가하지 않음 (사용자가 `never` 타입을 호출할 경로가 없음)
- 비동기 curry / placeholder 인자 — 현재 요구사항이 아님

## 5. 검증 기준

- `pnpm test` 통과 (런타임 assertion)
- `pnpm test:type` 통과 (`expectTypeOf` 검증)
- `pnpm lint` 통과 (biome)
- `pnpm build:type` 성공 (`tsc -p tsconfig.build.json`)으로 `.d.ts`에 추론 시그니처가 정확히 노출되는지 확인
