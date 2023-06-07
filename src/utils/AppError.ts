export class AppError {
    message: string;

    constructor(message: string) {
        this.message = message
    }

    static isAppError(error: unknown){
        return error instanceof AppError
    }
}