const { default: mongoose, get } = require("mongoose");
const Book = require("../../models/book");
const review = require("../../models/review");


module.exports = {
  createBook: async (data) => {
    return await Book.create(data);
  },

  getAllBooks: async (query) => {
    const { search, offset = 0, limit = 10 } = query;

    let filter = {};
    if (search) {
      filter.$or = [
        { BookName: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { genre: { $regex: search, $options: "i" } } // optional enhancement
      ];
    }

    const books = await Book.find(filter)
      .skip(Number(offset))
      .limit(Number(limit));

    const total = await Book.countDocuments(filter);
    const count = books.length;

    return { books, total, count };
  },

  getBookById: async (id) => {

    const book = await Book.findById(id)
    if (!book) return null;
    const reviews = await review.find({ bookTitle: id });
    // Attach reviews to the book object (as a plain JS object)
    const bookObj = book.toObject();
    bookObj.reviews = reviews;
    return bookObj;
  },
  findByIdForReview: async (id) => {

    return await review.findById(id)

  },

};
