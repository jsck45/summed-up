import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For custom jest-dom matchers
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { PostForm } from './PostForm';
import { CREATE_POST, GET_CATEGORIES, GET_POSTS } from '../utils/queries';

// Mock the necessary data and mutation
const mocks = [
  {
    request: {
      query: CREATE_POST,
      variables: {
        title: 'Test Post',
        content: 'Test Content',
        category: 'categoryId', // Replace with an actual category ID
        author: 'testUser',
      },
    },
    result: {
      data: {
        addPost: {
          // Mock the response data if needed
          _id: 'postId',
          title: 'Test Post',
          content: 'Test Content',
          category: {
            _id: 'categoryId',
            name: 'Test Category',
          },
          author: {
            username: 'testUser',
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_CATEGORIES,
    },
    result: {
      data: {
        categories: [
          {
            _id: 'categoryId',
            name: 'Test Category',
          },
        ],
      },
    },
  },
  // Add more mocks as needed for other queries or mutations
];

test('user can create a post', async () => {
  // Arrange
  const { getByLabelText, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PostForm show={true} handleClose={() => {}} />
    </MockedProvider>
  );

  // Act
  const titleInput = getByLabelText('Title');
  const contentTextarea = getByLabelText('Content');
  const categorySelect = getByLabelText('Category');
  const createPostButton = getByText('Create Post');

  fireEvent.change(titleInput, { target: { value: 'Test Post' } });
  fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });
  fireEvent.change(categorySelect, { target: { value: 'categoryId' } });
  
  await act(async () => {
    fireEvent.click(createPostButton);
    await waitFor(() => expect(createPostButton).toBeDisabled());
  });

  // Assert
  // Add assertions based on the expected behavior after creating a post
  // For example, you might expect the modal to close or the loading spinner to appear
  
  // Ensure that the mock mutation was called
  await waitFor(() =>expect(mocks[0].result).toHaveBeenCalled()
);
});
