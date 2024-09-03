import { Logger } from './logger.js';

/**
 * Class to parse command-line arguments.
 */
export class ArgumentParser {
    private readonly args: string[];
    private readonly logger: Logger;

    /**
     * Creates an instance of ArgumentParser.
     * @param {string[]} args - The command-line arguments.
     * @param {Logger} logger - The logger instance for logging messages.
     */
    constructor(args: string[], logger: Logger) {
        this.args = args;
        this.logger = logger;
    }

    /**
     * Gets the value of a specific argument.
     * @param {string} flag - The argument flag to look for.
     * @returns {string | null} - The value of the argument if found, otherwise null.
     */
    getArgValue(flag: string): string | null {
        const index = this.args.indexOf(flag);
        return (index !== -1 && index + 1 < this.args.length) ? this.args[index + 1] : null;
    }
}