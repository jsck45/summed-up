import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../utils/queries'; 
import './PostList.css';

function PostList({postLink}) {

// const { loading, error, data } = useQuery(GET_POSTS);

// if (loading) return <p>Loading...</p>;
// if (error) return <p>Error: {error.message}</p>;

// const posts = data.posts;

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const placeholderPosts = [
    // comment out when connected and uncomment the above
    {
      _id: '1',
      title: 'Placeholder Post 1',
      content: 'This is the content of Placeholder Post 1.',
      author: 'John Doe',
      date: new Date().toISOString(),
    },
    {
      _id: '2',
      title: 'Placeholder Post 2',
      content: 'This is the content of Placeholder Post 2.',
      author: 'Jane Smith',
      date: new Date().toISOString(),
    },
  ];

  const [posts, setPosts] = useState(placeholderPosts);

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
    marginTop: '1rem'
  };

  const cardBodyStyle = {
    borderBottom: '1px solid #ddd',
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
  const handleShareButtonClick = (postId) => {
    const postLink = `https://yourwebsite.com/post/${postId}`;

    const inputElement = document.createElement('input');
    inputElement.value = postLink;

    document.body.appendChild(inputElement);

    inputElement.select();
    document.execCommand('copy');

    document.body.removeChild(inputElement);

handleShowModal()
  };

  return (
    <div>
      <div className="card-container">
        {posts.map((post) => (
          <div key={post._id} className="card" style={cardStyle}>
            <div className="card-body" style={cardBodyStyle}>
              <p className="card-text">{new Date(post.date).toLocaleString()}</p>
              <Link to={`/posts/${post._id}`} className="card-title" style={cardTitleStyle}>
  {post.title}
</Link>
              <p className="card-text" style={cardTextStyle}>
                {post.content}
              </p>
              <button onClick={() => handleCommentButtonClick(post._id)} style={commentButtonStyle}>
                <FontAwesomeIcon icon={faComment} /> Comment
              </button>
              <button onClick={() => handleShareButtonClick(post._id)} style={commentButtonStyle}>
                <FontAwesomeIcon icon={faShare} /> Share
              </button>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
}

export default PostList;
