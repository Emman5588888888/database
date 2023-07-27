const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 5,
    max: 100,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
