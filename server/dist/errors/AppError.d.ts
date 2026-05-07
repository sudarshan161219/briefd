export interface AppErrorArgs {
    message: string;
    statusCode?: number;
    code?: string;
    debugMessage?: string;
    cause?: Error;
}
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly code?: string;
    readonly debugMessage?: string;
    readonly isOperational: boolean;
    readonly cause?: unknown;
    constructor(args: AppErrorArgs);
}
//# sourceMappingURL=AppError.d.ts.map