import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Button, Modal, Row, Col } from 'react-bootstrap';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

function PostDetail() {
  const { postId } = useParams();

  // const { loading, error, data } = useQuery(GET_POST, {
  //   variables: { postId }, 
  // });

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   console.error('Error fetching post data:', error);
  //   return <p>Error loading post data.</p>;
  // }

  // const post = data.post;

  // placeholder data, comment out and uncomment above
  const post = {
    _id: postId,
    title: 'Sample Post Title',
    content: 'This is the content of the sample post.',
    date: new Date().toISOString(),
  };

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
    marginTop: '1rem',
  };

  const cardBodyStyle = {
    // borderBottom: '1px solid #ddd',
    padding: '1rem 0',
  };

  return (
    <div className="card py-5" key={post._id} style={cardStyle}>
            <Container style={{ borderLeft: '1px solid #ccc', paddingLeft: '3rem' }} className="container">

      <div className="card-body" style={cardBodyStyle}>
        <p className="card-text">{new Date(post.date).toLocaleString()}</p>
        <h2 className="card-title" style={cardTitleStyle}>
          {post.title}
        </h2>
        <p className="card-text" style={cardTextStyle}>
          {post.content}
        </p>
        {/* <Link to={`/posts/${post._id}`}>Back to Posts</Link> */}
      </div>
      <CommentForm postId={postId} /> 
      <CommentList postId={postId} />
      </Container>
    </div>
  );
}

export default PostDetail;
