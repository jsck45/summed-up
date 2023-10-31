import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
      me {
        _id
        username
        email
        posts {
          _id
          title
          content
          dateCreated
          comments {
            _id
            content
            dateCreated
          }
        }
      }
    }
`;

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      _id
      title
      content
      author {
        _id
        username
        email
      }
      dateCreated
      comments {
        _id
        content
        author {
          _id
          username
          email
        }
        dateCreated
      }
      categories {
        _id
        name
      }
      summary
    }
  }
`;

export const GET_USER_POSTS = gql`
query GetUserPosts($userId: ID!) {
  getUserPosts(userId: $userId) {
    _id
    title
    content
    dateCreated
    comments {
      _id
      content
      author {
        _id
        username
      }
      dateCreated
    }
  }
}
`


export const GET_SINGLE_POST = gql`
  query getSinglePost($_id: ID!) {
    getSinglePost(_id: $_id) {
      _id
      title
      content
      author {
        _id
        username
      }
      dateCreated
      comments {
        _id
        content
        dateCreated
        author {
          _id
          username
        }
      }
      categories {
        _id
        name
      }
    }
  }
`;


export const GET_POSTS_BY_CATEGORY = gql`
  query getPostsByCategory($category: String!) {
    getPostsByCategory(category: $category) {
      _id
      title
      content
      dateCreated
      author {
        username
      }
      comments {
        _id
        content
        dateCreated
        author {
          username
        }
      }
      categories {
          _id
          name
      }
      summary
    }
  }
`;


export const GET_COMMENTS = gql`
  query GetComments($postId: ID!) {
    commentsByPost(postId: $postId) {
      _id
      content
      author {
        username
      }
      dateCreated
    }
  }
`;

export const GET_CATEGORIES = gql`
query GetCategories {
  categories {
    _id
    name
  }
}
`;
