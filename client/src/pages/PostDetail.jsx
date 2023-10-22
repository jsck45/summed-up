import React from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { postId } = useParams();

  // Use the postId to fetch and display the post details

  return (
    <div>
      <h1>Post Details for ID: {postId}</h1>
      {/* Add your post content and details here */}
    </div>
  );
}

export default PostDetail;
