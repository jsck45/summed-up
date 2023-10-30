import React, { useState } from "react";
import { Container, Button, Modal, Row, Col } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import Auth from "../utils/auth";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';


const MainContainer = styled.div`
  @media (max-width: 767px) {
    border-left: none !important;
    padding: 0 !important;
  }
`;

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [posts, setPosts] = useState([]); 
  const [newPosts, setNewPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [generateUniqueId, setGenerateUniqueId] = useState([]);

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
    const newPost = {
      _id: uuidv4(), // Generate a unique ID for the new post
      title: post.title,
      content: post.content,
      author: user.username, // Assuming you have the user information
      category: selectedCategory || newCategory, // Assuming you have the selected category
      dateCreated: new Date().toISOString(), // Set the current date as the creation date
    };

    // Update the newPosts state with the new post
    newPosts.unshift(newPost);
    setNewPosts([...newPosts]); // Create a new array reference to trigger the update

    addPost({
      variables: {
        title: post.title,
        content: post.content,
        author: user.username, // Assuming you have the user information
        category: selectedCategory || newCategory, // Assuming you have the selected category
      },
      refetchQueries: ["GET_POSTS"],
    });
    handleCloseModal();
  };

  const [addPost] = useMutation(CREATE_POST);

  return (
    <div className="py-5">
      <Container>
        <MainContainer
          style={{ borderLeft: "1px solid #ccc", paddingLeft: "3rem" }}
        >
          <Button
            variant="success"
            onClick={handleShowModal}
            className="my-3 button"
            style={{
              backgroundColor: "#dbbb2c",
              color: "white",
              border: "none",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#c99c06")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#dbbb2c")}
          >
            Create Post
          </Button>

          {showModal ? (
            <PostForm
              show={showModal}
              handleClose={handleCloseModal}
              handleCreatePost={handleCreatePost}
              posts={posts}
              user={user}
              selectedCategory={selectedCategory}
            />
          ) : null}
          {showMessage && !Auth.loggedIn() && (
            <Modal show={showMessage} onHide={() => setShowMessage(false)}>
              <Modal.Header closeButton>
                <Modal.Title>oops!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Please log in or sign up to post.</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowMessage(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          <PostList posts={[...newPosts, ...posts]} />
        </MainContainer>
      </Container>
    </div>
  );
};

export default Home;
