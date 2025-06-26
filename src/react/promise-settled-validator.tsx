
/**
 * `Promise.allSettled`의 결과를 선언적으로 작성할 수 있도록 구성한 유틸 함수
 * 
 * @description
 * - 결과가 성공(fulfilled)이라면 renderProps을 통해 성공된 promise타입을 리턴
 * - 결과가 실패(reject)라면 Error를 throw
 * 
 * @example
 * ```tsx
 * const [result1, result2] = await fetchPromiseAllSettled();
 * 
 * <ErrorBoundary fallbackRenderer={<Error />}>
 *   <Suspense fallback={<Loading />}>
 *     <PromiseAllSettledFulfilled result={result1}>
 *       {({ result }) => (
 *         <DataView data={result.value} />
 *       )}
 *     </PromiseAllSettledFulfilled>
 *   </Suspense>
 * </ErrorBoundary>
 * ```
 */
export const PromiseAllSettledFulfilled = <T,>(
  result: PromiseSettledResult<T>,
  children: (result: PromiseFulfilledResult<T>) => React.ReactNode,
) => {
  if (!isFulfilled(result)) {
    throw new Error(result.reason ?? 'Promise Settled Rejected')
  }

  return (
    <>{children(result)}</>
  )
};

const isFulfilled = <T,>(
  result: PromiseSettledResult<T>,
): result is PromiseFulfilledResult<T> => {
  return result.status === "fulfilled";
};