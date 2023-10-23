import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../utils/queries'; 
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const CommentCard = styled.div`
  background: #fff;
  padding: 0.5rem 0;
  margin: 1rem 3rem 0;
  border: none;

  .comment-details {
    display: flex;
    justify-content: space-between;
  }

  .card-body {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
  }
`;

function CommentList({ postId }) {
//   const { loading, error, data } = useQuery(GET_COMMENTS, {
//     variables: { postId },
//   });

//   if (loading) {
//     return <p>Loading comments...</p>;
//   }

//   if (error) {
//     console.error('Error fetching comments:', error);
//     return <p>Error loading comments.</p>;
//   }

//   const comments = data.comments; 



const cardStyle = {
    background: '#fff',
    padding: '0.5rem 0',
    margin: '1rem 3rem 0 ',
    border: 'none',
  };

  const cardBodyStyle = {
    borderBottom: '1px solid #ddd',
    padding: '1rem 0', 
  };

  const placeholderComments = [
    {
      _id: 'comment1',
      user: {
        username: 'user 1',
      },
      text: 'This is a placeholder comment 1.',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'comment2',
      user: {
        username: 'user 2',
      },
      text: 'This is a placeholder comment 2.',
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <div>
      <h4 className='my-3'><strong>comments</strong></h4>
      {/* <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.user.username}</strong>: {comment.text}
            <br />
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul> */}

      <Container>
        {placeholderComments.map((comment) => (
          <div className="card" style={cardStyle} key={comment._id}>
            <div className="comment-details">
            <strong>{comment.user.username}</strong>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </div>
            <div style={cardBodyStyle}>{comment.text}</div>
            
          </div>
        ))}
      </Container>

    </div>
  );
  
}

export default CommentList;
