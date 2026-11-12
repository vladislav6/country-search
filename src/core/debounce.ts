function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number = 300): T {
  if (delay && fn()) {
    return fn;
  }
  throw new Error('Not implemented');
}

export default debounce;
