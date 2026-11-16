export class HttpError extends Error {
    status;
    constructor(status) {
        super(`HTTP Error ${status}`);
        this.name = 'HttpError';
        this.status = status;
    }
}
