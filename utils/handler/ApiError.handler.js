/**
 * Custom error class for handling API errors. Extends the native Error class.
 * @class ApiError
 * @extends Error
 *
 * @param {number} statusCode - HTTP status code associated with the error.
 * @param {string} [message="Something went wrong"] - Error message (default is a generic message).
 * @param {Array} [errors=[]] - Array containing specific error details or additional information.
 * @param {boolean} [isOperational=true] - Indicates if the error is operational or not.
 * @param {string} [stack=""] - Stack trace for the error (optional, defaults to an empty string).
 */
class ApiError extends Error {	
	constructor(
		statusCode,
		message = 'Something went wrong',
		errors = [],
		isOperational = true,
		stack = ''
	) {
		
		super(message);

		
		this.statusCode = statusCode; 
		this.data = null; 
		this.message = message; 
		this.success = false; 
		this.errors = errors; 
		this.isOperational = isOperational; 

		
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor); 
		}
	}
}


module.exports = ApiError;