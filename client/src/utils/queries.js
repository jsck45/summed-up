import { gql } from '@apollo/client';

export const GET_ME = gql`
# needs more work
    query me {
        me {
            _id
            username
            email
            
        }
    }
`;

export const GET_POSTS = gql`
  query getPosts {
    posts {
      _id
      title
      content
      author
      date
    }
  }
`;