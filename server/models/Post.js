const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, },
  author:
  {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // reference
  dateCreated: { type: Date, default: Date.now(), },
  comments: [commentSchema], // subdocument
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],

  summary: { type: String }
})

const Post = model('Post', postSchema);

module.exports = Post;