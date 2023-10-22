const resolvers = {
  Query: {
    user: async () => { },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    }
  },
};

module.exports = resolvers;