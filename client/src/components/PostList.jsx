import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../utils/queries";
import styled from "styled-components";

const CardContainer = styled.div`
  @media (max-width: 767px) {
    border-left: none !important;
    padding: 2rem !important;
  }
`;

const CategoryButton = styled.div`
  .custom-button {
    display: inline-block;
    padding: 0.5rem 0.8rem;
    margin-top: 0.5rem;
    background-color: #dbbb2c;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    user-select: none;
    text-decoration: none;
  }

  .custom-button:hover {
    background-color: #c99c06;
  }

  .custom-button:active {
    background-color: #c99c06;
  }
`;

function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [showModal, setShowModal] = useState(false);
  const [postLink, setPostLink] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (loading) {
      setPosts(null);
    } else if (error) {
      setPosts(null);
    } else {
      const sortedPosts = data.getPosts.slice().sort((a, b) => b.dateCreated - a.dateCreated);

      setPosts(sortedPosts);
    }
  }, [loading, error, data]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const cardStyle = {
    background: "#e9e9e9",
    padding: "2rem",
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
    padding: "0",
  };

  const commentButtonStyle = {
    background: "none",
    color: "grey",
    border: "none",
    padding: "1rem 2rem 1rem 0",
    cursor: "pointer",
  };

  const handleCommentButtonClick = (postId) => {
    return `/posts/${postId}`;
  };

  const handleShareButtonClick = async (postId) => {
    const currentURL = window.location.href;
    const postLink = `${currentURL}post/${postId}`;
  
    try {
      await navigator.clipboard.writeText(postLink);
      handleShowModal();
      setPostLink(postLink);
    } catch (err) {
      console.error('Unable to copy link to clipboard', err);
    }
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <CardContainer>
        <div className="card-container">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="card" style={cardStyle}>
                <div className="card-body" style={cardBodyStyle}>
                  <p className="card-text">
                    {post.dateCreated
                      ? new Date(parseInt(post.dateCreated)).toLocaleString()
                      : "No date available"}
                  </p>
                  <Link
                    to={`/posts/${post._id}`}
                    className="card-title"
                    style={cardTitleStyle}
                  >
                    {post.title}
                  </Link>
                  <div>
                    <small>
                      {post.categories &&
                        post.categories.length > 0 &&
                        post.categories.map((category) => (
                          <CategoryButton key={category._id}>
                            <Link
                              to={`/category/${category.name}`}
                              className="custom-button"
                            >
                              {category.name}
                            </Link>
                          </CategoryButton>
                        ))}
                    </small>
                  </div>
                  <p className="card-text" style={cardTextStyle}>
                    {post.summary}
                  </p>
                  <button
                    onClick={() => handleCommentButtonClick(post._id)}
                    style={commentButtonStyle}
                  >
                    <FontAwesomeIcon icon={faComment} />{" "}
                    {post.comments ? post.comments.length : 0}
                  </button>
                  <button
                    onClick={() => handleShareButtonClick(post._id)}
                    style={commentButtonStyle}
                  >
                    <FontAwesomeIcon icon={faShare} /> Share
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </CardContainer>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share this post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Share this post using the link below:</p>
          <input
            type="text"
            value={postLink}
            readOnly
            style={{ width: "100%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default PostList;
