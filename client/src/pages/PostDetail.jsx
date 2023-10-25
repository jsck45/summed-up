import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Button, Modal, Row, Col } from 'react-bootstrap';
import { EDIT_POST, DELETE_POST } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function PostDetail() {
  const { postId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  // const { loading, error, data } = useQuery(GET_POST, {
  //   variables: { postId }, 
  // });

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   console.error('Error fetching post data:', error);
  //   return <p>Error loading post data.</p>;
  // }

  // const post = data.post;

  // placeholder data, comment out and uncomment above
  const post = {
    _id: postId,
    title: 'Sample Post Title',
    content: 'This is the content of the sample post.',
    user: 'JohnDoe',
    date: new Date().toISOString(),
    comments: [
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
    ]
  };

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: (data) => {
      console.log('Post deleted')
    },
    onError: (error) => {
      console.error('Error deleting post:', error)
    }
  });

  const handleEditPost = (postId) => {
    // Implement logic to edit the post using a modal or form.
  };

  const handleDeletePost = (postId) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
     if (confirmed) {
      deletePost({
        variables: {
          postId: post._id,
        }
      })
     }

  };
  
  const cardStyle = {
    background: '#fff',
    padding: '0.5rem 0',
    margin: '1rem 0',
    border: 'none',
  };

  const cardTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  const cardTextStyle = {
    fontSize: '1rem',
    marginTop: '1rem',
  };

  const cardBodyStyle = {
    padding: '1rem 0',
  };

  const commentButtonStyle = {
    background: 'none',
    color: 'grey',
    border: 'none',
    padding: '1rem 2rem 1rem 0',
    cursor: 'pointer',
  };

  const handleCommentButtonClick = (postId) => {
    return (
      <Link to={`/posts/${postId}`}>View Post</Link>
    );
  }

  const [postLink, setPostLink] = useState(""); 

  const handleShareButtonClick = (postId) => {
    const postLink = `https://yourwebsite.com/post/${postId}`;

    const inputElement = document.createElement('input');
    inputElement.value = postLink;

    document.body.appendChild(inputElement);

    inputElement.select();
    document.execCommand('copy');

    document.body.removeChild(inputElement);
  

handleShowModal()
setPostLink(postLink);
  };


  return (
    <div className="card py-5" key={post._id} style={cardStyle}>
      <Container style={{ borderLeft: '1px solid #ccc', paddingLeft: '3rem' }} className="container">
        <div className="card-body" style={cardBodyStyle}>
          <UserDateWrapper>
            <p className="card-text">Posted by {post.user}</p>
            <p className="card-text"><small>{new Date(post.date).toLocaleString()}</small></p>
          </UserDateWrapper>
          <h2 className="card-title" style={cardTitleStyle}>
            {post.title}
          </h2>
          <p className="card-text" style={cardTextStyle}>
            {post.content}
          </p>
          <button onClick={() => handleCommentButtonClick(post._id)} style={commentButtonStyle}>
                <FontAwesomeIcon icon={faComment} />  {post.comments ? post.comments.length : 0}
              </button>
              <button onClick={() => handleShareButtonClick(post._id)} style={commentButtonStyle}>
                <FontAwesomeIcon icon={faShare} /> Share
              </button>
              <button onClick={() => handleEditPost(post._id)} style={commentButtonStyle}>
  <FontAwesomeIcon icon={faEdit} /> Edit
</button>
<button onClick={() => handleDeletePost(post._id)} style={commentButtonStyle}>
  <FontAwesomeIcon icon={faTrash} /> Delete
</button>
        </div>
        <CommentForm postId={postId} /> 
        <CommentList postId={postId} />
        
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>share this post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Link copied to clipboard: {postLink}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </div>
  );
}

export default PostDetail;
