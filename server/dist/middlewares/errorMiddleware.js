import { AppError } from "../errors/AppError.js";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err instanceof AppError
        ? err.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const response = {
        success: false,
        message: err.message || getReasonPhrase(statusCode),
    };
    if (process.env.NODE_ENV !== "production") {
        response.stack = err.stack || "";
        if (err instanceof AppError && err.debugMessage) {
            response.debug = err.debugMessage;
        }
    }
    else {
        console.error("Unhandled Error:", {
            message: err.message,
            stack: err.stack,
            path: req.path,
            method: req.method,
        });
    }
    res.status(statusCode).json(response);
};
//# sourceMappingURL=errorMiddleware.js.map