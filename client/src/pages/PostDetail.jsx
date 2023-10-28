import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Button, Modal } from "react-bootstrap";
import { EDIT_POST, DELETE_POST } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SINGLE_POST } from "../utils/queries";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faShare,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const UserDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function PostDetail() {
  const { postId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const { loading, error, data } = useQuery(GET_SINGLE_POST, {
    variables: { _id: postId }, 
  });
  const [posts, setPosts] = useState([]);
  const post = data?.getSinglePost;
  useEffect(() => {
    if (loading) {
      console.log("Loading...");
    }
    if (error) {
      console.error("Error:", error);
    }
    if (data) {
      console.log("Data received:", data);
      setPosts(data?.getSinglePost || []);
    }
  }, [loading, error, data]);

  const [editPostText, setEditPostText] = useState("");

  const [editPost] = useMutation(EDIT_POST);
  const [isEditing, setIsEditing] = useState(false);
  const handleToggleEdit = () => {
    if (!isEditing) {
      setEditPostText(post?.content);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = () => {
    editPost({
      variables: {
        postId: post?._id,
        title: post?.title,
        text: editPostText,
      },
      onCompleted: (data) => {
        console.log("Post edited:", data.editPost);
      },
      onError: (error) => {
        console.error("Error editing post:", error);
      },
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: (data) => {
      console.log("Post deleted");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  const handleDeletePost = () => {
    setShowModal(true);
  };

  const handleDeleteConfirmed = () => {
    deletePost({
      variables: {
        postId: post?._id,
      },
    });

    setShowModal(false);
  };

  const handleCommentButtonClick = () => {
    return <Link to={`/posts/${post?._id}`}>View Post</Link>;
  };

  const [postLink, setPostLink] = useState("");

  const handleShareButtonClick = () => {
    const postLink = `https://lit-scrubland-56813-23b87facb8d8.herokuapp.com/post/${post?._id}`;

    const inputElement = document.createElement("input");
    inputElement.value = postLink;

    document.body.appendChild(inputElement);

    inputElement.select();
    document.execCommand("copy");

    document.body.removeChild(inputElement);

    handleShowModal();
    setPostLink(postLink);
  };
  
  const PostContainer = styled.div`
  @media (max-width: 767px) {
    border-left: none !important;
    padding: 0 !important;
  }
`;

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
    padding: "1rem 0",
  };

  const commentButtonStyle = {
    background: "none",
    color: "grey",
    border: "none",
    padding: "1rem 2rem 1rem 0",
    cursor: "pointer",
  };

  const cardButtonStyle = {
    padding: "0",
  };

  console.log("Post:", post);

  return (
    <div className="card py-5" key={post?._id} style={cardStyle}>
      <PostContainer
        style={{ borderLeft: "1px solid #ccc", paddingLeft: "3rem" }}
        className="container"
      >
        <div className="card-body" style={cardBodyStyle}>
          <UserDateWrapper>
            <p className="card-text">Posted by {post?.user}</p>
            <p className="card-text">
              <small>
                {post && post.date ? new Date(post.date).toLocaleString() : ""}
              </small>
            </p>
          </UserDateWrapper>
          <h2 className="card-title" style={cardTitleStyle}>
            {post && post.title ? post.title : "Title not available"}
          </h2>
        </div>
        {isEditing ? (
          <div>
            <textarea
              value={editPostText}
              onChange={(e) => setEditPostText(e.target.value)}
              style={{ width: "100%" }}
            />
            <br />
            <button onClick={handleSaveEdit} style={commentButtonStyle}>
              Save
            </button>
            <button onClick={handleCancelEdit} style={commentButtonStyle}>
              Cancel
            </button>
          </div>
        ) : (
          <>
            <p className="card-text" style={cardTextStyle}>
              {post && post.content ? post.content : "Content not available"}
            </p>

            {/* Card Buttons (Edit, Delete, etc.) */}
            <div className="card-buttons" style={{ display: "flex" }}>
              <button
                onClick={() => handleCommentButtonClick(post?._id)}
                style={commentButtonStyle}
              >
                <FontAwesomeIcon icon={faComment} />{" "}
                {post && post.comments ? post.comments.length : 0}
              </button>
              <button
                onClick={() => handleShareButtonClick(post?._id)}
                style={commentButtonStyle}
              >
                <FontAwesomeIcon icon={faShare} /> Share
              </button>
              <button onClick={handleToggleEdit} style={commentButtonStyle}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button
                onClick={handleDeletePost}
                style={commentButtonStyle}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </>
        )}

        <CommentForm postId={postId} />
        <CommentList postId={post?._id} />

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Share this post</Modal.Title>
          </Modal.Header>
          <Modal.Body>Link copied to clipboard: {postLink}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirmed}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </PostContainer>
    </div>
  );
}

export default PostDetail;
