const { Schema, model } = require('mongoose');
const Comment = require('./Comment');

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, },
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ], // reference
  dateCreated: { type: Date, default: Date.now(), },
  comments: [Comment], // subdocument

})

const Post = model('Post', postSchema);

module.exports = Post;