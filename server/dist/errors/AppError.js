import { StatusCodes } from "http-status-codes";
export class AppError extends Error {
    statusCode;
    code;
    debugMessage;
    isOperational;
    cause;
    constructor(args) {
        super(args.message);
        this.statusCode = args.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        this.code = args.code || "INTERNAL_ERROR";
        this.debugMessage =
            args.debugMessage || "No additional debug context provided.";
        this.cause = args.cause;
        this.isOperational = true;
        Object.setPrototypeOf(this, AppError.prototype);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
//# sourceMappingURL=AppError.js.map