/**
 * 함수의 인자 중 일부를 미리 채워 넣은 새로운 함수를 반환합니다.
 * `undefined`를 전달하여 나중에 채울 인자(placeholder)를 지정할 수 있습니다.
 */
export function partial<F extends (...args: any[]) => any>(
  fn: F,
  ...partialArgs: PartialArgs<Parameters<F>>
): (...args: any[]) => ReturnType<F> {
  return (...innerArgs: any[]) => {
    let innerIdx = 0;
    const finalArgs = partialArgs.map((arg) =>
      arg === undefined ? innerArgs[innerIdx++] : arg,
    );

    // 남은 innerArgs들을 뒤에 추가
    while (innerIdx < innerArgs.length) {
      finalArgs.push(innerArgs[innerIdx++]);
    }

    return fn(...finalArgs);
  };
}

type PartialArgs<T extends any[]> = {
  [K in keyof T]: T[K] | undefined;
};
