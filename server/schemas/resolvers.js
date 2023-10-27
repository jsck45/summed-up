const { User, Category, Post, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, _, { _id }) => { return User.findById(_id) },
    users: async () => { return User.find() },
    category: async (parent, id) => { return Category.findById(id) },
    categories: async () => { return Category.find() },
    getPosts: async () => {
      const posts = await Post.find().populate('author'); 
          const postsWithAuthorUsername = posts.map((post) => ({
        ...post.toObject(), 
        author: {
          ...post.author.toObject(), 
          username: post.author.username, 
        },
      }));
    
      return postsWithAuthorUsername;
    },
    getPostsByCategory: async (parent, { category }) => {
      const posts = await Post.find({ 'categories.name': category }).populate('author');
      const postsWithAuthorUsername = posts.map((post) => ({
        ...post.toObject(),
        author: {
          ...post.author.toObject(),
          username: post.author.username,
        },
      }));

      return postsWithAuthorUsername;
    },
  getSinglePost: async (parent, { _id }) => { return Post.findById(_id) },

  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, args) => {
      await Post.create(args);

      return Post;
    },
    loginEmail: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);

      return { token, user };
    },
    loginUserName: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;