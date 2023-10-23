const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  content: { type: String, required: true },
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ], // reference
  dateCreated: { type: Date, default: Date.now(), },

})

const Comment = commentSchema;

module.exports = Comment;