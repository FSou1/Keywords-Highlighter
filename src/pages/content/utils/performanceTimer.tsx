export function measurePerformance(func: Function, fractionDigits?: number) {
  const start = performance.now();

  const result = func();

  const end = performance.now();

  return {
    executionTimeMs: (end - start).toFixed(fractionDigits),
    result,
  };
}
