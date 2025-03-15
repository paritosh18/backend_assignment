const { postController } = require('../../../controllers');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const { postSchema } = require('../../../validation');
const userRoutes = require('express').Router();

userRoutes.use(auth);
userRoutes
    .route('/')
    .post(validate(postSchema) , postController.createPosts);

userRoutes
    .route('/')
    .get(postController.getAllPosts);

module.exports = userRoutes;