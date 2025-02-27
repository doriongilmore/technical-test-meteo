import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    next: NextFunction,
) => {
    logger.error(error, { url: req.url, method: req.method });
    res.status(500).json({
        error: "Internal server error",
    });
};
