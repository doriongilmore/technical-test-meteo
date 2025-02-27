/* eslint-disable no-console */
export const logger = {
    info: (...args: unknown[]) => {
        console.info(...args);
    },
    error: (...args: unknown[]) => {
        console.error(...args);
    },
    warn: (...args: unknown[]) => {
        console.warn(...args);
    },
    debug: (...args: unknown[]) => {
        console.debug(...args);
    },
    log: (...args: unknown[]) => {
        console.log(...args);
    },
};
/* eslint-enable no-console */
