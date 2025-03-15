const authRouter = require('express').Router()
authRouter.use('/', require('./user.routes'));
module.exports = authRouter          
  