import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!)
    {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER_EMAIL = gql `
    mutation login($email: String!, $password: String!)
    {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER_USERNAME = gql `
    mutation login($username: String!, $password: String!)
    {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_POST = gql`
  mutation createPost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      _id
      title
      content
      user {
        username
      }
      createdAt
    }
  }
`;


export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($postId: ID!, $title: String!, $content: String!) {
    updatePost(postId: $postId, title: $title, content: $content) {
      _id
      title
      content
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      _id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      _id
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: ID!, $text: String!) {
    updateComment(commentId: $commentId, text: $text) {
      _id
      text
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($name: String!) {
    addCategory(name: $name) {
      _id
      name
    }
  }
`;