import React, { useState } from "react";
import { Container, Button, Modal, Row, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client'; 
import { CREATE_POST } from '../utils/mutations'; 
import Auth from '../utils/auth';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false); // State to control the message modal

  const handleShowModal = () => {
    if (Auth.loggedIn()) {
      setShowModal(true);
    } else {
      setShowMessage(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreatePost = (post) => {
    createPost({
      variables: { title: post.title, content: post.content },
      refetchQueries: ['GetPosts'],
    });
    handleCloseModal();
  };

  const [createPost] = useMutation(CREATE_POST);

  return (
    <div className="py-5">
      <Container>
        <Row>
          {/* Hide the categories sidebar on small screens (sm and below) */}
          <Col lg={3} className="mb-4 d-none d-sm-block">
            {/* Sidebar Content */}
            <div className="sidebar py-3">
              <h4>categories</h4>
              {/* Add your category links or content here */}
            </div>
          </Col>
          <Col lg={9} style={{ borderLeft: '1px solid #ccc', paddingLeft: '3rem' }} >
            {/* <h1>Posts</h1> */}
            <Button variant="success" onClick={handleShowModal} className="my-3">
              Create Post
            </Button>
            {showModal ? (
              <PostForm
                show={showModal}
                handleClose={handleCloseModal}
                handleCreatePost={handleCreatePost}
              />
            ) : null}
            {showMessage && !Auth.loggedIn() && (
              <Modal show={showMessage} onHide={() => setShowMessage(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Please log in or sign up to post.
                </Modal.Body>
              </Modal>
            )}
            <PostList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
