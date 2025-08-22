export const createStopWatch = () => {
  let startTime: number = 0;
  let currentTime: number = 0;
  let cachedPerfHooks: typeof import("node:perf_hooks") | null = null;

  const getTime = async () => {
    if (typeof performance !== "undefined") {
      return performance.now();
    }

    if (cachedPerfHooks === null) {
      try {
        cachedPerfHooks = await import("node:perf_hooks");
      } catch (error) {
        throw new Error(
          "SSR 환경에서 node:perf_hooks 모듈을 불러올 수 없습니다."
        );
      }
    }

    return cachedPerfHooks.performance.now();
  };

  const clear = () => {
    startTime = 0;
    currentTime = 0;
  };

  return {
    start: async () => {
      clear();
      startTime = await getTime();
    },
    stop: async () => {
      if (startTime === 0) {
        throw new Error("stopWatch: start() 함수를 먼저 호출해주세요.");
      }

      currentTime = await getTime();
      return Math.floor(currentTime) - Math.floor(startTime);
    },
    clear,
  };
};
