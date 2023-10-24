import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS_BY_CATEGORY } from "../utils/queries";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryPostContainer = styled.div`
  @media (max-width: 767px) {
    border-left: none !important;
    padding: 0 !important;
  }
`;

function CategoryPage({ selectedCategory }) {
  //   const { loading, error, data } = useQuery(GET_POSTS_BY_CATEGORY, {
  //     variables: { category: selectedCategory },
  //   });

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error.message}</p>;

  //   const posts = data.postsByCategory;
  const cardStyle = {
    background: "#fff",
    padding: "0.5rem 0",
    margin: "1rem 0",
    border: "none",
  };

  const cardTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const cardTextStyle = {
    fontSize: "1rem",
    marginTop: "1rem",
  };

  const cardBodyStyle = {
    borderBottom: "1px solid #ddd",
    padding: "1rem 0",
  };

  const [category, setCategory] = useState({
    name: "Technology",
    posts: [
      {
        _id: "1",
        title: "Tech Post 1",
        content: "This is a tech post content.",
        createdAt: new Date().toISOString(),
        comments: [
          {
            _id: "comment1",
            content: "This is a sample comment on the tech post.",
            createdAt: new Date().toISOString(),
            user: {
              username: "Alice",
            },
          },
        ],
      },
      {
        _id: "2",
        title: "Tech Post 2",
        content: "Another tech post content.",
        createdAt: new Date().toISOString(),
        comments: [
          {
            _id: "comment2",
            content: "Another sample comment on the tech post.",
            createdAt: new Date().toISOString(),
            user: {
              username: "Bob",
            },
          },
        ],
      },
    ],
  });

  return (
    <div className="py-5">
      <CategoryPostContainer style={{ borderLeft: '1px solid #ccc', paddingLeft: '3rem' }}>
        <h1 style={{ paddingBottom: "1rem", textAlign: "end" }}>
          {category.name}
        </h1>

        {category.posts.map((post) => (
          <div className="card" key={post._id} style={cardStyle}>
            <div className="card-body" style={cardBodyStyle}>
              <p className="card-text">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <Link
                to={`/posts/${post._id}`}
                className="card-title"
                style={cardTitleStyle}
              >
                {post.title}
              </Link>
              <p className="card-text" style={cardTextStyle}>
                {post.content}
              </p>
            </div>
          </div>
        ))}
      </CategoryPostContainer>
    </div>
  );
}

export default CategoryPage;
