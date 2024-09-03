/**
 * Logger class to handle logging messages.
 */
export class Logger {
    /**
     * Logs a message to the console.
     * @param {string} message - The message to log.
     * @param {'info' | 'error'} [level='info'] - The log level, either 'info' or 'error'.
     */
    log(message: string, level: 'info' | 'error' = 'info'): void {
        if (level === 'error') {
            console.error(message);
        } else {
            console.log(message);
        }
    }
}