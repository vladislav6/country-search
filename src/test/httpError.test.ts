import { describe, expect, it } from 'vitest';
import { HttpError } from '../core/httpError.ts';

describe('HttpError', () => {
  it('should create an instance of HttpError', () => {
    const error = new HttpError(404);

    expect(error).toBeInstanceOf(HttpError);
    expect(error).toBeInstanceOf(Error);
  });

  it('should set the correct error message', () => {
    const error = new HttpError(404);

    expect(error.message).toBe('HTTP Error 404');
  });

  it('should set the correct error name', () => {
    const error = new HttpError(500);

    expect(error.name).toBe('HttpError');
  });

  it('should store the HTTP status code', () => {
    const error = new HttpError(403);

    expect(error.status).toBe(403);
  });

  it.each([400, 401, 403, 404, 500, 503])('should handle HTTP status %i', (status) => {
    const error = new HttpError(status);

    expect(error.status).toBe(status);
    expect(error.message).toBe(`HTTP Error ${status}`);
  });
});
