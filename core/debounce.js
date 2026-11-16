function debounce(fn, delay = 300) {
    let timeoutId = null;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}
export default debounce;
