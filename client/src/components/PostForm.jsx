import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST, ADD_CATEGORY } from "../utils/mutations";
import { GET_CATEGORIES } from "../utils/queries";
import Auth from "../utils/auth";

const PostForm = ({ show, handleClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const { loading, data } = useQuery(GET_CATEGORIES);
  
  const existingCategories = data ? data.categories : [];

  const [addPost] = useMutation(CREATE_POST);
  const [addCategory] = useMutation(ADD_CATEGORY, {
    update: (cache, { data }) => {
      const existingCategories = cache.readQuery({
        query: GET_CATEGORIES,
      });
      cache.writeQuery({
        query: GET_CATEGORIES,
        data: {
          categories: [...existingCategories.categories, data.addCategory],
        },
      });
    },
  });

  const user = Auth.getProfile(); 

const handleSubmit = () => {
  addPost({
    variables: {
      title,
      content,
      category: selectedCategory || newCategory,
      author: user.username, 

    },
  })
    .then((response) => {
      setPosts([...posts, response.data.addPost]);
      console.log("New post created:", response.data.addPost);
      handleClose();
    })
    .catch((error) => {
      console.error("Error creating a new post:", error);
    });
};


  const handleAddCategory = () => {
    addCategory({
      variables: { name: newCategory },
    })
      .then((response) => {
        console.log("New category added:", response.data.addCategory);
        setNewCategory(""); 
      })
      .catch((error) => {
        console.error("Error adding a new category:", error);
      });
  };

  return (
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
          <Form.Group controlId="postCategoryInput">
            <Form.Label>Or Enter Your Own Category</Form.Label>
            <Form.Control
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={handleAddCategory}
              style={{ marginTop: "10px" }}
            >
              Add Category
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostForm;
