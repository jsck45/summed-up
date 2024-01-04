import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from '../utils/queries';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import Auth from '../utils/auth';
import { CREATE_POST } from '../utils/mutations'; 
import PostForm from '../components/PostForm'; 

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
   
  const userId = loggedInUser.data._id;
  const navigate = useNavigate(); 


  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCommentButtonClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleShareButtonClick = async (postId) => {
    const currentURL = window.location.href;
    const postLink = `${currentURL}post/${postId}`;

    try {
      await navigator.clipboard.writeText(postLink);
      handleShowModal();
      setPostLink(postLink);
    } catch (err) {
      console.error("Unable to copy link to clipboard", err);
    }
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
    padding: "0",
  };

  const commentButtonStyle = {
    background: "none",
    color: "grey",
    border: "none",
    padding: "1rem 2rem 1rem 0",
    cursor: "pointer",
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
    <div className="py-5">
      <ProfileContainer style={{ borderLeft: '1px solid #ccc', paddingLeft: '3rem' }}>
        <h1 style={{ paddingBottom: '1rem', textAlign: 'end' }}>hi, {loggedInUser ? loggedInUser.data.username : 'you'}!</h1>
        <Button
          variant="light"
          onClick={handleShowModal}
          className="my-4 button"
          style={{ backgroundColor: '#e39c7b', color: 'white' }}
        >
          Create Post
        </Button>
        <h2 style={{ fontWeight: 'bolder' }}>your posts</h2>

        {userPosts.length === 0 && (
        <p>You have no posts yet! Create your first post!</p>
        )}

        {userPosts.length > 0  && userPosts.map((post) => (
          <div className="card" key={post._id} style={cardStyle}>
            <div className="card-body" style= {cardBodyStyle}>
              <p className="card-text">
                {new Date(parseInt(post.dateCreated)).toLocaleString()}
              </p>
           
              <Link to={`/posts/${post._id}`} className="card-title" style={cardTitleStyle}>
                {post.title}
              </Link>
              
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
              <p className="card-text" style={cardTextStyle}>{post.summary}</p>
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
          <p>Share this post using the link below:</p>
          <input
            type="text"
            value={postLink}
            readOnly
            style={{ width: "100%" }}
          />
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
