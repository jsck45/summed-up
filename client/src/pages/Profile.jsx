import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function UserProfile({ userId }) {
//   const { loading, error, data } = useQuery(GET_ME, {
//     variables: { userId },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const user = data.user;
const cardStyle = {
    background: '#fff',
    padding: '0.5rem 0',
    margin: '1rem 0',
    border: 'none',
  };

  const cardTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const cardTextStyle = {
    fontSize: '1rem',
  };

  const cardBodyStyle = {
    borderBottom: '1px solid #ddd',
    padding: '1rem 0', 
  };

const [user, setUser] = useState({
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    posts: [
      {
        _id: '1',
        title: 'Sample Post 1',
        content: 'This is a sample post content.',
        date: '2022-01-01',
      },
      {
        _id: '2',
        title: 'Sample Post 2',
        content: 'Another sample post content.',
        date: '2022-02-01',
      },
    ],
  });


  return (
    <div className="py-5">
      <Container>
        <Row>
          <Col lg={3} className="mb-4 d-none d-sm-block">
            <div className="sidebar py-3">
              <h4>categories</h4>
              {/* Add your category links or content here */}
            </div>
          </Col>
          <Col lg={9} style={{ borderLeft: '1px solid #ccc', paddingLeft: '3rem' }}>
            <h1>hi, {user.username}!</h1>
            {/* Display user information (username, email, etc.) here */}
            
            <h2>your posts</h2>
            {user.posts.map((post) => (
              <div className="card" key={post._id} style={cardStyle}>
                <div className="card-body" style={cardBodyStyle}>
                <p className="card-text">Date: {post.date}</p>
                  <h5 className="card-title" style={cardTitleStyle}>{post.title}</h5>
                  <p className="card-text" style={cardTextStyle}>{post.content}</p>
                
                </div>
              </div>
            ))}
          </Col>          
        </Row>
      </Container>
    </div>
  );
}

export default UserProfile;