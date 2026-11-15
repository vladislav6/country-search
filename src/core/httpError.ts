export class HttpError extends Error {
  readonly status: number;
  constructor(status: number) {
    super(`HTTP Error ${status}`);
    throw new Error('not implement');
  }
}
