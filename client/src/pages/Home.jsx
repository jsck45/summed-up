import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Row, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client'; 
import { CREATE_POST } from '../utils/mutations'; 
import Auth from '../utils/auth';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import styled from 'styled-components';

const MainContainer = styled.div`
  @media (max-width: 767px) {
    border-left: none !important;
    padding: 0 !important;
  }
`;

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false); 
  const [refreshPosts, setRefreshPosts] = useState(false); 

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
    })
      .then(() => {
        setRefreshPosts(true); 
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error creating a new post:', error);
      });
  };

  const [createPost] = useMutation(CREATE_POST);

  useEffect(() => {
    if (refreshPosts) {
      setRefreshPosts(false); 
    }
  }, [refreshPosts]);

  return (
      <div className="py-5">
      <Container >
            <MainContainer style={{ borderLeft: '1px solid #ccc', paddingLeft: '3rem' }} >
            {/* <Button variant="success" onClick={handleShowModal} className="my-3">
              Create Post
            </Button>
            {showModal ? (
              <PostForm
                show={showModal}
                handleClose={handleCloseModal}
                handleCreatePost={handleCreatePost}
              />
            ) : null} */}
            {showMessage && !Auth.loggedIn() && (
              <Modal show={showMessage} onHide={() => setShowMessage(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>oops!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Please log in or sign up to post.
                </Modal.Body>
              </Modal>
            )}
            <PostList />
            </MainContainer>
        </Container>
      </div>
    );
  };

export default Home;
