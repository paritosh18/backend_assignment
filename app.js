const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/handler/ApiError.handler');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}


app.use(helmet());


app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use(xss());



app.use(cors());
app.options('*', cors());


if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

app.use('/api', routes);


app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});


app.use(errorConverter);


app.use(errorHandler);

module.exports = app;
