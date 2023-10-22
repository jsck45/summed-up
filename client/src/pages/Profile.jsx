import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Categories from '../components/Categories';

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
    textDecoration: 'none',
  };

  const cardTextStyle = {
    fontSize: '1rem',
    marginTop: '1rem'
  };

  const cardBodyStyle = {
    borderBottom: '1px solid #ddd',
    padding: '1rem 0', 
  };

const [user, setUser] = useState({
    // comment this out when connected to back end
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    posts: [
      {
        _id: '1',
        title: 'Sample Post 1',
        content: 'This is a sample post content.',
        date: new Date().toISOString(),
    },
      {
        _id: '2',
        title: 'Sample Post 2',
        content: 'Another sample post content.',
        date: new Date().toISOString(),
    },
    ],
  });


  return (
    <div className="py-5">
      <Container style={{ borderLeft: '1px solid #ccc', paddingLeft: '3rem' }}>
            <h1 style={{paddingBottom: '1rem', textAlign:'end'}}>hi, {user.username}!</h1>
                      
            <h2 style={{fontWeight:'bolder'}}>your posts</h2>
            {user.posts.map((post) => (
              <div className="card" key={post._id} style={cardStyle}>
                <div className="card-body" style={cardBodyStyle}>
                <p className="card-text">{new Date(post.date).toLocaleString()}</p>
                <Link to={`/posts/${post._id}`} className="card-title" style={cardTitleStyle}>
  {post.title}
</Link>
                  <p className="card-text" style={cardTextStyle}>{post.content}</p>
                
                </div>
              </div>
            ))}
      </Container>
    </div>
  );
}

export default UserProfile;