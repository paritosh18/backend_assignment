/**
 * Class representing a standard API response.
 * @class ApiResponse
 *
 * @param {number} statusCode - HTTP status code associated with the response.
 * @param {any} data - Data to be returned in the response.
 * @param {string} [message="Success"] - Response message (default is "Success").
 */
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data; 
        this.message = message;
        this.success = statusCode < 400; 
    }
}


module.exports = ApiResponse;
