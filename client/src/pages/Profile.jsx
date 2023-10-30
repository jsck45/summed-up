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

const CategoryButton = styled.div`
  .custom-button {
    display: inline-block;
    padding: 0.5rem 0.8rem;
    margin-top: 0.5rem;
    background-color: #dbbb2c;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    user-select: none;
    text-decoration: none;
  }

  .custom-button:hover {
    background-color: #c99c06;
  }

  .custom-button:active {
    background-color: #c99c06;
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
    const postLink = `https://summed-up-8795a7f223a9.herokuapp.com/post/${postId}`.toLowerCase();

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

  const cardStyle = {
    background: "#e9e9e9",
    padding: "2rem",
    margin: "1rem 0",
    border: "none",
  };

  const cardTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const cardTextStyle = {
    fontSize: "1rem",
    marginTop: "1rem",
  };

  const cardBodyStyle = {
    borderBottom: "1px solid #ddd",
    padding: "1rem 0",
  };

  const commentButtonStyle = {
    background: "none",
    color: "grey",
    border: "none",
    padding: "1rem 2rem 1rem 0",
    cursor: "pointer",
  };


  return (
    <div className="py-5">
      <ProfileContainer style={{ borderLeft: '1px solid #ccc', paddingLeft: '3rem' }}>
        <h1 style={{ paddingBottom: '1rem', textAlign: 'end' }}>hi, {loggedInUser ? loggedInUser.data.username : 'you'}!</h1>
        <h2 style={{ fontWeight: 'bolder' }}>your posts</h2>
        {userPosts.map((post) => (
          <div className="card" key={post._id} style={cardStyle}>
            <div className="card-body" style= {cardBodyStyle}>
              <p className="card-text">
                {new Date(parseInt(post.dateCreated)).toLocaleString()}
              </p>
              {post.categories &&
                        post.categories.length > 0 &&
                        post.categories.map((category) => (
                          <CategoryButton key={category._id}>
                            <Link
                              to={`/category/${category.name}`}
                              className="custom-button"
                            >
                              {category.name}
                            </Link>
                          </CategoryButton>
                        ))}
              <Link to={`/posts/${post._id}`} className="card-title" style={cardTitleStyle}>
                {post.title}
              </Link>
              <p className="card-text" style={cardTextStyle}>{post.content}</p>
              <button onClick={() => handleCommentButtonClick(post._id)} style={commentButtonStyle}>
                <FontAwesomeIcon icon={faComment} />{' '}
                {post.comments ? post.comments.length : 0}
              </button>
              <button onClick={() => handleShareButtonClick(post._id)} style={commentButtonStyle}>
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
