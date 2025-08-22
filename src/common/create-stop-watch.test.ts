import { createStopWatch } from "./create-stop-watch.js";
import { vi } from "vitest";
import type { Mock } from "vitest";
import * as perfHooks from "node:perf_hooks";

const INITIAL_PERFORMANCE_NOW_TIME = 60000;
const TIME_1000_MS = 1000;

describe("create-stop-watch", () => {
  let mockTime: number;
  let mockCsrPerformance: Mock<() => number>;
  let mockSsrPerformance: Mock<() => number>;

  beforeEach(() => {
    mockTime = INITIAL_PERFORMANCE_NOW_TIME;
    mockCsrPerformance = vi.fn(() => mockTime);
    mockSsrPerformance = vi.fn(() => mockTime);
    
    vi.useFakeTimers();
    vi.stubGlobal("performance", { now: mockCsrPerformance });
    vi.spyOn(perfHooks.performance, "now").mockImplementation(
      mockSsrPerformance
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.resetModules();
  });

  describe("클라이언트 환경에서 동작", () => {
    test("start() 이후 1초 뒤에 stop() 호출 시, 1초(ms) 리턴", async () => {
      
      const stopWatch = createStopWatch();
      await stopWatch.start();

      mockTime = mockTime + TIME_1000_MS;
      vi.advanceTimersByTime(TIME_1000_MS);

      const elapsed = await stopWatch.stop();
      expect(mockCsrPerformance).toHaveBeenCalledTimes(2);
      expect(elapsed).toBe(TIME_1000_MS);
    });

    test("start() 이후 stop() 없이 다시 start() 호출 시, 디바운싱", async () => {
      const stopWatch = createStopWatch();
      await stopWatch.start();

      mockTime = mockTime + TIME_1000_MS;
      vi.advanceTimersByTime(TIME_1000_MS);

      mockTime = INITIAL_PERFORMANCE_NOW_TIME;
      await stopWatch.start();

      mockTime = mockTime + TIME_1000_MS;
      vi.advanceTimersByTime(TIME_1000_MS);

      const elapsed = await stopWatch.stop();
      expect(elapsed).toBe(TIME_1000_MS);
    });
  });

  describe("서버 환경에서 동작", () => {
    beforeEach(() => {
      vi.stubGlobal("window", undefined);
      vi.stubGlobal("performance", undefined);
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    test("서버 환경에서 동작 시, node:perf_hooks 모듈이 작동하여 동작", async () => {
      const stopWatch = createStopWatch();
      await stopWatch.start();

      mockTime = mockTime + TIME_1000_MS;
      vi.advanceTimersByTime(TIME_1000_MS);

      const elapsed = await stopWatch.stop();
      expect(mockSsrPerformance).toHaveBeenCalledTimes(2);
      expect(mockCsrPerformance).not.toHaveBeenCalled();
      expect(elapsed).toBe(TIME_1000_MS);
    });
  });
});
