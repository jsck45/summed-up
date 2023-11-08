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

        // const postsWithAuthorUsername = posts.map((post) => ({
        //   ...post.toObject(),
        //   author: {
        //     ...post.author.toObject(),
        //     username: post.author.username,
        //   },
        // }));

        // return postsWithAuthorUsername;
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
        const comments = await Comment.find({ postId }).populate('author');
        return comments;
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


      //ChatGPT integration code
      let summary = "";
      // const content = "Embark on an exhilarating journey with me as I traverse the globe's enchanting landscapes. From the unspoiled shores of idyllic beaches to the awe-inspiring heights of majestic mountains, I invite you to peer through the window of my adventures and witness the sheer magnificence our planet boasts. Let's forge ahead together and start this incredible odyssey!\nUncover hidden gems in far-off places, absorb the vibrant cultures that adorn our world, and bask in the diversity of our natural wonders. Whether it's a peaceful escape by the azure waters, an adrenaline-filled mountain hike, or a leisurely stroll through charming streets, you'll experience it all as if you were right there.\nPrepare to be transported to remarkable destinations, each with its own unique allure. So fasten your seatbelts, as we embark on this incredible journey to explore the breathtaking beauty that our extraordinary world has to offer.";
      const params = [{
        "role": "system",
        "content": "You are a concise and plain speaking assistant."
      },
      {
        "role": "user",
        "content": "Please summarise the following text. " + content
      }]

      client
      .post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-4",
        messages: params,
        max_tokens: 1024,
        temperature: 0,
      })
      .then((result) => {
        console.log(result.data.choices[0].message.content);
    
        summary = result.data.choices[0].message.content;
        return Post.create({
          title,
          content,
          summary, 
          author: user._id,
        })
        .then((newPost) => {
          return User.findOneAndUpdate({ _id: context._id }, { $addToSet: { posts: newPost._id } })
          .then((updatedUser) => {
            return { ...newPost.toObject(), author };
          })
          .catch((error) => {
            throw new Error("Error creating a new post: " + error.message);
          });
        });
      })
      .catch((error) => {
        throw new Error("Error creating a new post: " + error.message);
      });
    
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

    editPost: async (parent, { postId, title, content }) => {
      await Post.findOneAndUpdate({ _id: postId }, { title, content }, {
        new: true
      });

      return Post;
    },
    deletePost: async (parent, args, context) => {
      await Post.findOneAndDelete({ _id: args._id });
      await User.findOneAndUpdate({ _id: context._id }, { $pull: { posts: args._id } });

      return Post;
    },
    addComment: async (parent, { postId, content }, context) => {
      await Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: {
            comments: { content, author: context.author }
          }
        }, {
        new: true
      });

      return Post;
    },
    editComment: async (parent, { postId, commentId, content }) => {
      await Post.findOneAndUpdate({ _id: postId, 'comments._id': commentId }, { $set: { 'comments.$': content } }, {
        new: true
      });

      return Post;
    },
    deleteComment: async (parent, { postId, commentId }) => {
      await Post.findOneAndDelete(
        { _id: postId },
        {
          $pull: {
            comments: {
              _id: commentId
            }
          }
        }
      );

      return Post;
    }
  },
};

module.exports = resolvers;