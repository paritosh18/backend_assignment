const config = require('./config');

// CORS Configuration
const corsOptions = (req, callback) => {
	const allowedOrigins =
		config.env !== 'development'
			? [`http://${req.hostname}`, 'http://localhost:5173']
			: ['http://localhost:5173']; 

	const corsConfig = {
		origin: allowedOrigins.includes(req.header('Origin'))
			? req.header('Origin')
			: false,
		credentials: true, // Allow cookies and credentials
	};
	if (config.env === 'production') {
		corsOptions.sameSite = 'Strict'; // Prevent cross-site request forgery
	}
	callback(null, corsConfig);
};

module.exports = corsOptions;
