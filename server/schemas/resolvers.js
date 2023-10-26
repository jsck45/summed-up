const { User, Category, Post, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, _, { _id }) => User.findById(_id),
    users: async () => User.find(),
    category: async (parent, id) => Category.findById(id),
    categories: async () => Category.find(),
    getPosts: async () => Post.find(),
    getSinglePost: async (parent, { _id }) => { Post.findById(_id) },

  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, args) => {
      await Post.create(args);

      return
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
    loginUserName: async (parent, { userName, password }) => {
      const user = await User.findOne({ userName });

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