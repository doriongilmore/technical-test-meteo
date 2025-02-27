import { Request, Response } from "express";
import { errorHandler } from "./errorHandler";
import { logger } from "../utils/logger";

jest.mock("../utils/logger");
const mockLogger = logger as jest.Mocked<typeof logger>;

describe("ErrorHandler Middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            url: "/test",
            method: "GET",
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
        jest.clearAllMocks();
    });

    it("should handle errors and send 500 response", () => {
        const error = new Error("Test error");

        errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockLogger.error).toHaveBeenCalledWith(error, {
            url: "/test",
            method: "GET",
        });
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Internal server error",
        });
    });
});
