const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]
  }

  type Auth {
    token: ID
    user: User
  }

  type Category {
    _id: ID
    name: String
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
    categories: [Category]
    summary: String
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
    category(_id: ID!): Category
    categories: [Category]
    getSinglePost(_id: ID!): Post
    getPosts: [Post]
    getPostsByCategory(category: String!): [Post] 
    commentsByPost(postId: ID!): [Comment]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
    ): Auth
    
    loginEmail(
      email: String!
      password: String!
    ): Auth
    loginUserName(
      username: String!
      password: String!
    ): Auth
    addPost(
      title: String!
      content: String
      author: ID
      categories: [ID] 
    ): Post
    editPost(
      title: String
      content: String
    ): Post
    deletePost(_id: ID!): Post
    addComment(
      postId: ID!
      content: String!
    ): Post
    editComment(
      postId: ID!
      commentId: ID!
      content: String
    ): Post
    deleteComment(
      postID: ID!
      commentId: ID!  
    ): Post
  }
`;

module.exports = typeDefs;