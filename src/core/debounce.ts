function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number = 300) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export default debounce;
