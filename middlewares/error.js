
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/handler/ApiError.handler');
const ApiResponse = require('../utils/handler/ApiResponse.handler');


class ErrorHandler {
    static errorConverter(err, req, res, next) {
        let error = err;

        if (Array.isArray(error.errors) && error.errors.length > 0) {
            const messages = error.errors.map(e => e.message);
            error = new ApiError(400, messages.join(', '), error.errors, true, err.stack);
        }

        if (!(error instanceof ApiError)) {
            const statusCode = error.statusCode || 500;
            const message = error.message || 'Something went wrong';
            error = new ApiError(statusCode, message, [], false, err.stack);
        }

        next(error);
    }

    static errorHandler(err, req, res, _next) {
        let { statusCode = 500, message = 'Internal server error' } = err;

        if (config.env === 'production' && !err.isOperational) {
            statusCode = 500;
            message = 'An unexpected error occurred';
        }

        res.locals.errorMessage = err.message;

        logger.error({
            message: err.message,
            stack: err.stack,
            statusCode,
            errors: err.errors || [],
        });

        res.status(statusCode).json(
            new ApiResponse(statusCode, null, message, {
                stack: config.env === 'development' && err.stack ? err.stack : undefined,
                errors: config.env === 'development' && Array.isArray(err.errors) ? err.errors.map(e => e.message) : [],
            })
        );
    }
}

module.exports = ErrorHandler;
