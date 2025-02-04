const { User, Category, Post } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
require('dotenv').config();
const axios = require('axios');

const client = axios.create({
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
  },
});

const resolvers = {
  Query: {
    me: async (parent, _, { _id }) => { return User.findById(_id) },
    users: async () => { return User.find({}) },
    categories: async () => { return Category.find({}) },
    getPosts: async () => {
      try {
        const posts = await Post.find({})
          .populate('author')
          .populate('categories', 'name')
          .populate('summary');

    
        return posts;
      } catch (error) {
        console.error("Error in getPosts resolver: ", error);
        throw error;
      }
    },

    getPostsByCategory: async (parent, { category }, context) => {
      try {
        const categoryObject = await Category.findOne({
          name: { $regex: new RegExp(category, 'i') },
        });

        if (!categoryObject) {
          throw new Error(`Category not found: ${category}`);
        }

        const posts = await Post.find({ categories: categoryObject._id })
          .populate('author')
          .populate('categories', 'name')
          .populate('summary');
    

        const postsWithAuthorUsername = posts.map((post) => ({
          ...post.toObject(),
          author: {
            ...post.author.toObject(),
            username: post.author.username,
          },
        }));

        return postsWithAuthorUsername;
      } catch (error) {
        console.error("Error in getPostsByCategory resolver: ", error);
        throw error;
      }
    },

    getSinglePost: async (parent, { _id }) => {
      try {

        const post = await Post.findById(_id)
          .populate({
            path: 'comments',
            populate: {
              path: 'author',
              select: 'username',
            },
          })
          .populate('author', 'username')
          .populate('categories', 'name')
          .populate('summary');

        return post;
      } catch (error) {
        console.error("Error in getSinglePost resolver: ", error);
        throw error;
      }
    },

    commentsByPost: async (_, { postId }) => {
      try {
        const comments = await Post.findById(postId).select('comments').populate('comments.author');

        return comments.comments;
      } catch (error) {
        console.error('Error fetching comments:', error);
        throw new Error('Failed to fetch comments.');
      }
    },

    getUserPosts: async (parent, { userId }, context) => {
      try {
        const posts = await Post.find({ author: userId })
          .populate('author') 
          .populate('categories', 'name')
          .populate('summary');
    

        const postsWithAuthorUsername = posts.map((post) => ({
          ...post.toObject(),
          author: {
            ...post.author.toObject(),
            username: post.author.username,
          },
        }));

        return postsWithAuthorUsername;
      } catch (error) {
        console.error("Error in getUserPosts resolver: ", error);
        throw error;
      }
    },




  },
  Mutation: {
    addUser: async (parent, args, context) => {

      const user = await User.create(args);

      const token = signToken(user);

      return { token, user };
    },

    addPost: async (parent, { title, content, category }, context) => {
      try {
        console.log('Mutation: addPost');

        const { user } = context;
    
        if (!user) {
          throw new AuthenticationError("You must be logged in to create a post.");
        }
    
        const author = await User.findById(user._id).select('username');
    
        if (!author) {
          throw new Error("User not found.");
        }
    
        const categoryObject = await Category.findOne({ _id: category });
        console.log('categoryObject:', categoryObject);
    
        // ChatGPT integration code
        let summary = "";
    
        const params = [{
          "role": "system",
          "content": "You are a concise and plain speaking assistant."
        }, {
          "role": "user",
          "content": "Please summarise the following text. " + content
        }];
    
        const result = await client.post("https://api.openai.com/v1/chat/completions", {
          model: "gpt-4",
          messages: params,
          max_tokens: 1024,
          temperature: 0,
        });
    
        // console.log(result.data.choices[0].message.content);
    
        summary = result.data.choices[0].message.content;

        const characterLimit = 300; 
        let limitedSummary = summary.slice(0, characterLimit);

        const lastFullStopIndex = limitedSummary.lastIndexOf('.');
        limitedSummary = lastFullStopIndex !== -1 ? limitedSummary.slice(0, lastFullStopIndex + 1) : limitedSummary;
    
        const newPost = await Post.create({
          title,
          content,
          summary: limitedSummary,
          author: user._id,
          categories: categoryObject,
          dateCreated: new Date(),
          });
        
        const updatedUser = await User.findOneAndUpdate(
          { _id: context._id },
          { $addToSet: { posts: newPost._id } }
        );
    
        return { ...newPost.toObject(), author };
      } catch (error) {
        console.error("Error creating a new post: ", error.message);

        throw new Error("Error creating a new post: " + error.message);
      }

    
    
      },
    
    loginEmail: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with that email address.");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password.");
      }
      const token = signToken(user);

      return { token, user };
    },
    loginUserName: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("No user found with that username.");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password.");
      }
      const token = signToken(user);

      return { token, user };
    },

    editPost: async (parent, { _id, title, content }) => {
      console.log("Received postId:", _id);

      const updatedPost = await Post.findOneAndUpdate(
        { _id: _id },
        { title, content },
        { new: true }
      );
    
      if (!updatedPost) {
        throw new Error("Post not found");
      }
    
      return updatedPost;
    },
    
  
    addComment: async (parent, { postId, content }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("You must be logged in to add a comment.");
        }

        const author = await User.findById(context.user._id).select('username');

        if (!author) {
          throw new Error("User not found.");
        }

        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { content, author }
            }
          },
          {
            new: true
          }
        );

        return updatedPost;
      } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
      }
    },
    editComment: async (parent, { postId, commentId, content }) => {
      await Post.findOneAndUpdate({ _id: postId, 'comments._id': commentId }, { $set: { 'comments.$': content } }, {
        new: true
      });

      return Post;
    },
    deleteComment: async (parent, { postId, commentId }) => {
      await Post.updateOne(
        { _id: postId },
        {
          $pull: {
            comments: {
              _id: commentId,
            },
          },
        }
      );
      const updatedPost = await Post.findById(postId);
      return updatedPost;
    },
    
    deletePost: async (parent, { _id }, context) => {
      try {
    
        const postToDelete = await Post.findById(_id);
    
        const deletedPost = await Post.findOneAndDelete({ _id: _id });
       
        return deletedPost;
      } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Post not found');
      }
    },
    
    
    
  },
};

module.exports = resolvers;