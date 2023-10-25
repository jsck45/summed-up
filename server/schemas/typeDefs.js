const typeDefs = `#graphql
  type User {
    _id: ID
    userName: String
    email: String
    password: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Category {
    _id: ID
    name: String
    subcategories: [SubCategory]
  }

  type SubCategory {
    _id: ID
    name: String
  }

  type Post {
    _id: ID
    title: String
    content: String
    author: User
    dateCreated: String
    comments: [Comment]
  }

  type Comment {
    _id:ID
    content: String
    author: User
    dateCreated: String
  }

  type Query {
    me: User
    users: [User]
    category: Category
    categories: [Category]
    getSinglePost(_id: ID!): Post
    posts: [Post]
  }

  type Mutation {
    addUser(
      userName: String!
      email: String!
      password: String!
    ): Auth
    addPost(
      title: String!
      content: String
      author: ID
    ): Post
    loginEmail(
      email: String!
      password: String!
    ): Auth
    loginUserName(
      userName: String!
      password: String!
    ): Auth
  }
`;

module.exports = typeDefs;