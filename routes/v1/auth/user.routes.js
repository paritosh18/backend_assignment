 const { registerController, loginController } = require('../../../controllers');
const validate = require('../../../middlewares/validate');
const { loginSchema, signupSchema } = require('../../../validation');


const userRoutes = require('express').Router();

userRoutes
    .route('/signup')
    .post(validate(signupSchema),registerController.signup);
userRoutes
     .route('/login')
     .post(validate(loginSchema),loginController.login)
module.exports = userRoutes