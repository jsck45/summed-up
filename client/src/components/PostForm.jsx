import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import { GET_CATEGORIES, GET_POSTS } from "../utils/queries";
import Auth from "../utils/auth";

const PostForm = ({ show, handleClose, handleCreatePost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const { data } = useQuery(GET_CATEGORIES);
  const [loading, setLoading] = useState(false); 
  const { refetch } = useQuery(GET_POSTS);


  const existingCategories = data ? data.categories : [];

  const [addPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });
  
  const user = Auth.getProfile(); 

const handleSubmit = () => {
  setLoading(true);

  addPost({
    variables: {
      title,
      content,
      category: selectedCategory,
      author: user.username, 

    },

  })
    .then((response) => {
      setLoading(false);
      setPosts([...posts, response.data.addPost]);
      console.log("New post created:", response.data.addPost);
      handleClose();
      refetch(); 
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error creating a new post:", error);
    });
};

return (
  <>
  <Modal show={loading} centered>
    <Modal.Body className="text-center">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <p>Summarizing...</p>
    </Modal.Body>
  </Modal>
  {!loading && (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Form>
      <Form.Group controlId="postTitle" style={{ marginBottom: "10px" }}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="postContent" style={{ marginBottom: "10px" }}>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="postCategory" style={{ marginBottom: "10px" }}>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {existingCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      
      </Form>      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Post
        </Button>
      </Modal.Footer>
    </Modal>
  )}
  </>
);
};

export default PostForm;


