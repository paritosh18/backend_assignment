const express = require('express');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
	{
		path: '/auth',
		route: require('./auth'),
	},
	{
		path:'/posts',
		route:require('./posts')
	}

];

const devRoutes = [
	 
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

if (config.env === 'development') {
	devRoutes.forEach((route) => {
		router.use(route.path, route.route);
	});
}

module.exports = router;
