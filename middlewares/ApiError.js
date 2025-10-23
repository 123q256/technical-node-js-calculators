class ApiError extends Error {
    constructor(
        message,
        status_code,
        error_code,
        errors = [],
        stack = "",

    ) {
        super(message);
        this.status = 'fail';
        this.message = message;
        this.status_code = status_code;
        this.error_code = error_code;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }

        // // Log the error using Winston
        // winston.error(`${this.statusCode} - ${this.message}`);
        // if (this.errors.length > 0) {
        //     winston.error(`Errors: ${JSON.stringify(this.errors)}`);
        // }
    }
}

module.exports = { ApiError };