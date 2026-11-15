export class HttpError extends Error {
  readonly status: number;
  constructor(status: number) {
    super(`HTTP Error ${status}`);
    this.name = 'HttpError';
    this.status = status;
  }
}
