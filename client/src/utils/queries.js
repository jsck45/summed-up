import { gql } from '@apollo/client';

export const GET_ME = gql`
# needs more work
    query me {
        me {
            _id
            username
            email
            posts {
         _id
        title
        content
        createdAt
      }
      comments {
        _id
        content
        createdAt
      }
        }
    }
`;


export const GET_POSTS = gql`
  query getPosts {
    posts {
      _id
      title
      content
      user {
        username
      }
      createdAt
      comments {
        _id
        content
        createdAt
        user {
          username
        }
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
query getSinglePost($postId: ID!) {
  post(postId: $postId) {
    _id
    title
    content
    user {
      username
    }
    createdAt
    comments {
      _id
      content
      createdAt
      user {
        username
      }
    }
  }
}`
