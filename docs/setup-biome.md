# Title

`biome` 도입

## Status

accepted

## Context

PROS

- eslint + prettier 대비 빠른 셋업
- 추가적인 플러그인 설치 불필요
- eslint + prettier 대비 더 좋은 성능

CONS

- 아주 좁은 적용 범위 (graphql을 사용한다면 쓸수없음)

## Decision

`biome` 도입

- react, javascript, typescript가 주력이기 때문에 범위가 일치함
- 그 외 나머지는 모두 eslint+prettier 대비 높은 생산성 + 빠른 setup 가능

## Consequences

`biome`를 통해 린팅 및 포맷팅

``` json
pnpm lint
```
