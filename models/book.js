const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  userId: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  BookName: {
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre:{
    type: String,
    required: true
  },
  rating:{
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
  
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
