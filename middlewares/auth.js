const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const ApiError = require('../utils/handler/ApiError.handler');
const config = require('../config/config');

const verifyCallback = async (req, resolve, reject) => {
	const token = req.header('x-auth-token') || req.cookies?.accessToken;
	if (!token) {
		return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
	}

	try {
		const decoded = jwt.verify(token, config.jwt.secret);
		req.user = decoded;
		resolve();
	} catch (error) {
		return reject(
			new ApiError(400, 'Please authenticate', error)
		);
	}
};


const auth = async (req, res, next) => {
		return new Promise((resolve, reject) => {
			verifyCallback(req, resolve, reject);
		})
		.then(() => next())
		.catch((err) => next(err));
	};

module.exports = auth;