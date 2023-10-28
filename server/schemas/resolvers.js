const { User, Category, Post, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, _, { _id }) => { return User.findById(_id) },
    users: async () => { return User.find() },
    category: async (parent, id) => { return Category.findById(id) },
    categories: async () => { return Category.find() },
    getPosts: async () => {
      try {
        const posts = await Post.find()
          .populate('author') 
          .populate('categories', 'name'); 
    
        const postsWithAuthorUsername = posts.map((post) => ({
          ...post.toObject(),
          author: {
            ...post.author.toObject(),
            username: post.author.username,
          },
        }));
    
        return postsWithAuthorUsername;
      } catch (error) {
        console.error("Error in getPosts resolver: ", error);
        throw error;
      }
    },
    
    getPostsByCategory: async (parent, { category }) => {
      const posts = await Post.find({
        'categories.name': { $regex: new RegExp(`^${category}$`, 'i') }
      })
        .populate('author')
        .populate({
          path: 'categories',
          select: 'name',
        });
    
      const postsWithAuthorUsername = posts.map((post) => ({
        ...post.toObject(),
        author: {
          ...post.author.toObject(),
          username: post.author.username,
        },
        categories: post.categories.map((category) => ({
          _id: category._id,
          name: category.name,
        })),
      }));
      console.log(postsWithAuthorUsername); 

      return postsWithAuthorUsername;
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
          .populate('categories', 'name'); 
        
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