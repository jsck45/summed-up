import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';
import { Modal } from 'react-bootstrap';
import { GET_COMMENTS } from '../utils/queries';

function CommentForm({ postId }) {
  const [commentText, setCommentText] = useState('');
  const [addComment] = useMutation(ADD_COMMENT, { refetchQueries: [{ query: GET_COMMENTS}],});
  const [showModal, setShowModal] = useState(false);
  // const { refetch } = useQuery(GET_COMMENTS);

  const user = Auth.loggedIn() ? Auth.getProfile() : null;
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!Auth.loggedIn()) {
        setShowModal(true);

        return;
      }

    try {
      const { data } = await addComment({
        variables: { postId, content: commentText, author: user.username },
      });

      const newComment = data.addComment;
       
      const { author, dateCreated } = newComment;

      console.log('New Comment', newComment);
      
      setCommentText('');
      // refetch();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const postBtnStyle = {
    backgroundColor: '#e39c7b',
    color: 'white', 
    transition: 'background-color 0.3s ease',
  };

  const postBtnHoverStyle = {
    backgroundColor: '#e38c64', 
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <div className="form-group my-3">
        <textarea
          className="form-control"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </div>
      <button type="submit" className="btn my-2" style={postBtnStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = postBtnHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = postBtnStyle.backgroundColor)}
 >
        Post Comment
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>oops!</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Please log in or sign up to post a comment.</p>
  </Modal.Body>
  <Modal.Footer>
    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
      Close
    </button>
  </Modal.Footer>
</Modal>
    </form>
  );
}

export default CommentForm;
