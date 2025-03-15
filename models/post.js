const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  postName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  uploadTime: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: [String],
    default: []
  },
  imageUrl: {
    type: String
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
