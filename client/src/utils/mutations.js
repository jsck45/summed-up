import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export const LOGIN_USER_EMAIL = gql`
    mutation loginEmail($email: String!, $password: String!)
    {
        loginEmail(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN_USER_USERNAME = gql`
    mutation loginUsername($username: String!, $password: String!)
    {
        loginUsername(username: $username, password: $password) {
            token
            user {
                _id
                username
                email
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

export const EDIT_POST = gql`
  mutation editPost($postId: ID!, $title: String!, $content: String!) {
    editPost(postId: $postId, title: $title, content: $content) {
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

export const EDIT_COMMENT = gql`
  mutation editComment($PostId: ID!, $commentId: ID!, $text: String!) {
    editComment(postId: $PostID, commentId: $commentId, text: $text) {
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