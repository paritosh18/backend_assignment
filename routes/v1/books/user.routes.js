const { BookController } = require('../../../controllers');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const { bookSchema } = require('../../../validation');

const userRoutes = require('express').Router();

userRoutes.use(auth);
userRoutes
    .route('/')
    .post(validate(bookSchema) , BookController.createBokename);

userRoutes
    .route('/')  
    .get(BookController.getAllBooks);
userRoutes
    .route('/:id')  
    .get(BookController.getBookbyId);
userRoutes
    .route('/:id')  
    .post(BookController.createReviewForBook);
userRoutes
    .route('/reviews/:id')  
    .put(BookController.updateReview);
userRoutes
    .route('/reviews/:id')  
    .delete(BookController.deleteReview);



module.exports = userRoutes;