import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import debounce from '../core/debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return function', () => {
    const callback = vi.fn();
    const debounced = debounce(callback);
    expect(typeof debounced).toBe('function');
  });

  it('should call callback after the specified delay', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 500);
    debounced();
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback before delay', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 500);
    debounced();
    vi.advanceTimersByTime(499);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should reset timer on repeated calls', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 500);
    debounced();
    vi.advanceTimersByTime(300);
    debounced();
    vi.advanceTimersByTime(300);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to callback', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 500);
    debounced('hello', 123);
    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledWith('hello', 123);
  });

  it('should call callback only once after multiple calls', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 500);
    debounced();
    debounced();
    debounced();
    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
