import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    _next: NextFunction,
) => {
    logger.error(err.message, req);
    res.status(500).json({ error: "Internal server error" });
};
