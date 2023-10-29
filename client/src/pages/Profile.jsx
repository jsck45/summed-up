import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from '../utils/queries';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import Auth from '../utils/auth';

const ProfileContainer = styled.div`
  @media (max-width: 767px) {
    border-left: none !important;
    padding: 0 !important;
  }
`;

function UserProfile() {
  
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postLink, setPostLink] = useState('');
  
  const loggedInUser = Auth.getProfile();

  console.log(loggedInUser);
  const userId = loggedInUser.data._id;

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCommentButtonClick = (postId) => {
    return `/posts/${postId}`;
  };

  const handleShareButtonClick = (postId) => {
    const postLink = `https://lit-scrubland-56813-23b87facb8d8.herokuapp.com/post/${postId}`;

    const inputElement = document.createElement('input');
    inputElement.value = postLink;

    document.body.appendChild(inputElement);

    inputElement.select();
    document.execCommand('copy');

    document.body.removeChild(inputElement);

    handleShowModal();
    setPostLink(postLink);
  };

  console.log('userId:', userId);

  const { loading, error, data } = useQuery(GET_USER_POSTS, {
    variables: { userId }, 
  });

  useEffect(() => {
    if (!loading && !error) {
      const postsByUser = data.getUserPosts; 
      setUserPosts(postsByUser);
    }
  }, [loading, error, data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="py-5">
      <ProfileContainer style={{ borderLeft: '1px solid #ccc', paddingLeft: '3rem' }}>
        <h1 style={{ paddingBottom: '1rem', textAlign: 'end' }}>hi, {loggedInUser ? loggedInUser.username : 'you'}!</h1>
        <h2 style={{ fontWeight: 'bolder' }}>your posts</h2>
        {userPosts.map((post) => (
          <div className="card" key={post._id}>
            <div className="card-body">
              <p className="card-text">
                {new Date(post.date).toLocaleString()}
              </p>
              <Link to={`/posts/${post._id}`} className="card-title">
                {post.title}
              </Link>
              <p className="card-text">{post.content}</p>
              <button onClick={() => handleCommentButtonClick(post._id)}>
                <FontAwesomeIcon icon={faComment} />{' '}
                {post.comments ? post.comments.length : 0}
              </button>
              <button onClick={() => handleShareButtonClick(post._id)}>
                <FontAwesomeIcon icon={faShare} /> Share
              </button>
            </div>
          </div>
        ))}
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
      </ProfileContainer>
    </div>
  );
}

export default UserProfile;
