const Joi = require('joi');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required().messages({ 'any.required': 'JWT secret key is required' }),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).required().messages({ 'any.required': 'Access token expiration time is required' }),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).required().messages({ 'any.required': 'Refresh token expiration time is required' }),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10).required().messages({ 'any.required': 'Password reset token expiration time is required' }),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10).required().messages({ 'any.required': 'Email verification token expiration time is required' }),
    MONGO_URI: Joi.string().required().messages({ 'any.required': 'MongoDB connection URI is required' }),
    MONGO_DB_NAME: Joi.string().required().messages({ 'any.required': 'MongoDB database name is required' }),
}).unknown(true);

const { error, value: envVars } = envVarsSchema.validate(process.env, { abortEarly: false });

if (error) {
    throw new Error(`Config validation error: ${error.details.map(x => x.message).join(', ')}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongodb: {
        uri: envVars.MONGO_URI,
        dbName: envVars.MONGO_DB_NAME,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
  
};
