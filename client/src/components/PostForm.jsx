import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../utils/mutations';
import EmojiPicker from 'react-emoji-picker'; // Assuming you have the correct package name
import Categories from '../components/Categories';

const PostForm = ({ show, handleClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const [createPost] = useMutation(CREATE_POST);

  const handleSubmit = () => {
    createPost({
      variables: {
        title,
        content,
        category: selectedCategory,
        emoji: selectedEmoji,
      },
    })
      .then((response) => {
        console.log('New post created:', response.data.createPost);
        handleClose();
      })
      .catch((error) => {
        console.error('Error creating a new post:', error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="postTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="postContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="postCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {/* Render categories using the Categories component */}
              <Categories
                onCategorySelect={setSelectedCategory}
              />
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="postEmoji">
            <Form.Label>Choose an Emoji</Form.Label>
            <EmojiPicker
              onEmojiClick={(emoji) => setSelectedEmoji(emoji)}
              disableSearchBar
              disableSkinTonePicker
              disableAutoFocus
            />
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
