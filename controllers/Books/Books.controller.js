const ApiError = require("../../utils/handler/ApiError.handler");
const { AsyncHandler } = require("../../utils/handler/Async.handler");
const ApiResponse = require("../../utils/handler/ApiResponse.handler");
const booksService = require("../../services/books/books.service");
const BookReview = require("../../models/review");

module.exports = {

    createBokename: AsyncHandler(async (req, res) => {
        const { bookName, author, description, rating , genre } = req.body

        const userId = req.user.userId;
        if (!userId) {
            throw new ApiError(401, 'User not found.');
        }

        const data = { BookName: bookName, author, description, userId, rating ,genre };

        const createBook = await booksService.createBook(data);

        res
            .status(200)
            .json(new ApiResponse(200, { createBook }, 'Post created succesfully.'));
    }),


    getAllBooks: AsyncHandler(async (req, res) => {


        const result = await booksService.getAllBooks(req.query)


        res.status(200).json(new ApiResponse(200, { result }, 'Post Get Successfully'))

    }),

    getBookbyId: AsyncHandler(async (req, res) => {

        const { id } = req.params;

        const book = await booksService.getBookById(id);

        if (!book) {
            throw new ApiError(404, 'Book not found.');
        }
        res.status(200).json(new ApiResponse(200, book, 'Book retrieved successfully.'));

    }),

    createReviewForBook: AsyncHandler(async (req, res) => {

        const { id } = req.params;
        const { reviewText } = req.body;

        if (!reviewText) {
            throw new ApiError(400, 'Review is required.');
        }

        const book = await booksService.getBookById(id);
        if (!book) {
            throw new ApiError(404, 'Book not found.');
        }

        const existingReview = await BookReview.findOne({
            bookTitle: id,
            reviewer: req.user.userId
        });
        if (existingReview) {
            throw new ApiError(400, 'You have already reviewed this book.');
        }

        const newReview = await BookReview.create({
            bookTitle: id,
            reviewer: req.user.userId,
            reviewText
        });

        res.status(200).json(new ApiResponse(200, newReview, 'Review added successfully.'));
    }),


    updateReview: AsyncHandler(async (req, res) => {
        const { id } = req.params;
        const { reviewText } = req.body;

        if (!reviewText) {
            throw new ApiError(400, 'Review text is required.');
        }

        if (req.user.userId !== req.body.reviewer) {
            throw new ApiError(403, 'You are not authorized to update this review.');
        }

        const review = await booksService.findByIdForReview(id);
        if (!review) {
            throw new ApiError(404, 'Review not found.');
        }

        review.reviewText = reviewText;
        await review.save();

        res.status(200).json(new ApiResponse(200, review, 'Review updated successfully.'));
    }),

    deleteReview: AsyncHandler(async (req, res) => {
        const { id } = req.params;

        const review = await booksService.findByIdForReview(id);
        if (!review) {
            throw new ApiError(404, 'Review not found.');
        }

        if (review.reviewer.toString() !== req.user.userId) {
            throw new ApiError(403, 'You are not authorized to delete this review.');
        }

        await BookReview.findByIdAndDelete(id);

        res.status(200).json(new ApiResponse(200, null, 'Review deleted successfully.'));
    })
}