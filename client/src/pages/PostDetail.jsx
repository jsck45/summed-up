import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Modal } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SINGLE_POST } from "../utils/queries";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faShare,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {
  EDIT_POST,
  DELETE_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../utils/mutations";

import CommentForm from "../components/CommentForm";

const UserDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentCard = styled.div`
  background: #fff;
  padding: 0.5rem 0;
  margin: 1rem 3rem 0;
  border: none;

  .comment-details {
    display: flex;
    justify-content: space-between;
  }

  .card-body {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0 0 1rem;
  }
`;

const CategoryButton = styled.div`
.custom-button {
  display: inline-block;
  padding: 0.5rem 0.8rem; 
  background-color: #007bff; 
  color: #fff; 
  border-radius: 20px; 
  cursor: pointer;
  text-align: center;
  user-select: none; 
  text-decoration: none; 
}

.custom-button:hover {
  background-color: #0056b3; 
}

.custom-button:active {
  background-color: #003f80;
}

`

function PostDetail() {
  const { postId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShowShareModal = () => {
    setShowShareModal(true);
  };

  
  const handleShowModal = (deleteCommentModal = false) => {
    if (deleteCommentModal) {
      setShowDeleteCommentModal(true);
    } else {
      setShowModal(true);
    }
  };

  const { loading, error, data } = useQuery(GET_SINGLE_POST, {
    variables: { _id: postId },
  });

  const post = data?.getSinglePost;
  const comments = post?.comments || [];

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [editComment] = useMutation(EDIT_COMMENT);

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: (data) => {
      console.log("Post deleted");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onCompleted: (data) => {
      console.log("Comment deleted");
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });

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
    setEditingCommentId(null);
    setEditCommentText("");
  };

  const handleEditComment = (commentId) => {
    if (editingCommentId === commentId) {
      if (editCommentText) {
        editComment({
          variables: {
            commentId,
            text: editCommentText,
          },
          onCompleted: (data) => {
            console.log("Comment edited:", data.editComment);
          },
          onError: (error) => {
            console.error("Error editing comment:", error);
          },
        });
      }
      setEditingCommentId(null);
      setEditCommentText(""); 

    } else {
      const commentToEdit = comments.find((comment) => comment._id === commentId);

      if (commentToEdit) {
        setEditCommentText(commentToEdit.text);
        setEditingCommentId(commentId);
      }
    }
  };

  const handleDeletePost = () => {
    setSelectedCommentId(null); 
    handleShowModal();
  };

  const handleDeleteComment = (commentId) => {
    setSelectedCommentId(commentId);
    handleShowModal(true);
  };

  const handleDeleteConfirmed = () => {
    if (showModal) {
      deletePost({
        variables: {
          postId: post?._id,
        },
      });
    } else if (showDeleteCommentModal) {
      deleteComment({
        variables: {
          commentId: selectedCommentId,
        },
      });
    }

    setShowModal(false);
    setShowDeleteCommentModal(false);
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

    handleShowShareModal();
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
          <p className="card-text">Posted by {post?.author?.username}</p>
            <p className="card-text">
            <small>
  {post && post.dateCreated
    ? new Date(parseInt(post.dateCreated)).toLocaleString()
    : ""}
</small>

            </p>
          </UserDateWrapper>
          <h2 className="card-title" style={cardTitleStyle}>
            {post && post.title ? post.title : "Title not available"}
          </h2>
          <div><small>
            { post && post.categories && post.categories.length > 0 && (
              post.categories.map((category) => (
                <CategoryButton key={category._id}>
                <Link to={`/category/${category.name}`} className="custom-button">
                  {category.name}
                </Link>
              </CategoryButton>
              ))
            )}
            </small>
  </div>

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

            <div className="card-buttons" style={{ display: "flex" }}>
              <button
                onClick={() => handleCommentButtonClick(post?._id)}
                style={commentButtonStyle}
              >
                <FontAwesomeIcon icon={faComment} /> {comments.length}
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
              <button onClick={handleDeletePost} style={commentButtonStyle}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </>
        )}

        <CommentForm postId={postId} />

        <div>
          <h4 className="my-3">
            <strong>Comments</strong>
          </h4>
          <Container>
            {comments.map((comment) => (
              <CommentCard key={comment._id}>
                <div className="comment-details">
                  <strong>
                    {comment.author ? comment.author.username : "Unknown User"}
                  </strong>
                  <small>
                    {new Date(parseInt(comment.dateCreated)).toLocaleString()}
                  </small>
                </div>

                <div className="card-body">
                  {editingCommentId === comment._id ? (
                    <div>
                      <textarea
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        style={{ width: "100%" }}
                      />
                      <br />
                      <button
                        onClick={() => handleEditComment(comment._id)}
                        style={commentButtonStyle}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        style={commentButtonStyle}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      {comment.content}
                      <br />
                      {editingCommentId !== comment._id && (
                        <div>
                          <button
                            onClick={() => handleEditComment(comment._id)}
                            style={commentButtonStyle}
                          >
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            style={commentButtonStyle}
                          >
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CommentCard>
            ))}
          </Container>
        </div>

        <Modal
          show={showModal || showDeleteCommentModal}
          onHide={() => {
            setShowModal(false);
            setShowDeleteCommentModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedCommentId ? "Delete Comment" : "Delete Post"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCommentId
              ? "Are you sure you want to delete this comment?"
              : "Are you sure you want to delete this post?"}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirmed}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showShareModal} onHide={() => setShowShareModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Share Post</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Share this post using the link below:</p>
    <input type="text" value={postLink} readOnly style={{ width: '100%' }} />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowShareModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

      </PostContainer>
    </div>
  );
}

export default PostDetail;
