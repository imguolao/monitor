export function isNumber(val: unknown): val is number {
  return typeof val === "number" && !isNaN(val);
}

export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => any {
  let timeoutID: ReturnType<typeof setTimeout> | null;
  function wrapper(...args: any[]) {
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
    }

    // @ts-ignore
    timeoutID = setTimeout(() => callback.apply(this, args), delay);
  }

  return wrapper;
}
