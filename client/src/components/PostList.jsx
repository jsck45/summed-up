import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../utils/queries'; 

function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const posts = data.posts;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Date: {new Date(post.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
