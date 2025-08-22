export const measureFPS = () => {
  return new Promise<number>((resolve) => {
    const startTime = performance.now();
    let frames = 1;
    const MAX_MEASURE_TIME = 1000;

    const tick = () => {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      if (elapsed < MAX_MEASURE_TIME) {
        requestAnimationFrame(tick);
        frames += 1;
      } else {
        const fps = (frames / elapsed) * MAX_MEASURE_TIME
        resolve(Math.round(fps));
      }
    }

    requestAnimationFrame(tick);
  });
};