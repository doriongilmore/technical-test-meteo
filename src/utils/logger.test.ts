import { logger } from "./logger";

describe("Logger", () => {
    let consoleInfoSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;
    let consoleWarnSpy: jest.SpyInstance;
    let consoleDebugSpy: jest.SpyInstance;
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleInfoSpy = jest.spyOn(console, "info").mockImplementation();
        consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
        consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
        consoleDebugSpy = jest.spyOn(console, "debug").mockImplementation();
        consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should log info messages", () => {
        const args = ["Test info message", { data: 123 }];
        logger.info(...args);
        expect(consoleInfoSpy).toHaveBeenCalledWith(...args);
    });

    it("should log error messages", () => {
        const args = [new Error("Test error"), { context: "test" }];
        logger.error(...args);
        expect(consoleErrorSpy).toHaveBeenCalledWith(...args);
    });

    it("should log warning messages", () => {
        const args = ["Test warning", { data: "warning data" }];
        logger.warn(...args);
        expect(consoleWarnSpy).toHaveBeenCalledWith(...args);
    });

    it("should log debug messages", () => {
        const args = ["Test debug", { debug: true }];
        logger.debug(...args);
        expect(consoleDebugSpy).toHaveBeenCalledWith(...args);
    });

    it("should log general messages", () => {
        const args = ["Test log", 123, { data: "test" }];
        logger.log(...args);
        expect(consoleLogSpy).toHaveBeenCalledWith(...args);
    });
});
