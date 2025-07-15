const mongoose = require('mongoose');

const bookReviewSchema = new mongoose.Schema({
    bookTitle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'Book'
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'User'
    },
    reviewText: {
        type: String,
        required: true,
        trim: true
    },
    reviewDate: {
        type: Date,
        default: Date.now
    }
});

review = mongoose.model('BookReview', bookReviewSchema);

module.exports = review;