// import React, { useState } from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import { DELETE_COMMENT, EDIT_COMMENT } from "../utils/mutations";
// import { GET_COMMENTS } from "../utils/queries";
// import { Container, Modal, Button } from "react-bootstrap";
// import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// const CommentCard = styled.div`
//   background: #fff;
//   padding: 0.5rem 0;
//   margin: 1rem 3rem 0;
//   border: none;

//   .comment-details {
//     display: flex;
//     justify-content: space between;
//   }

//   .card-body {
//     border-bottom: 1px solid #ddd;
//     padding: 1rem 0 0 1rem;
//   }
// `;

// function CommentList({ postId }) {

//   const { loading, error, data } = useQuery(GET_COMMENTS, {
//     variables: { postId },
//   });

//   if (loading) {
//     return <p>Loading comments...</p>;
//   }

//   if (error) {
//     console.error('Error fetching comments:', error);
//     return <p>Error loading comments.</p>;
//   }

//   const comments = data.comments;

//   const [editCommentText, setEditCommentText] = useState("");
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCommentId, setSelectedCommentId] = useState(null);
  
//   const [editComment] = useMutation(EDIT_COMMENT);

//   const handleEditComment = (commentId) => {
//     console.log("Edit button clicked") 
//     if (editingCommentId === commentId) {
//       if (editCommentText) {
//         editComment({
//           variables: {
//             commentId,
//             text: editCommentText,
//           },
//           onCompleted: (data) => {
//             console.log("Comment edited:", data.editComment);
//           },
//           onError: (error) => {
//             console.error("Error editing comment:", error);
//           },
//         });
//       }
//       setEditingCommentId(null); 
//     } else {
//       const commentToEdit = comments.find((comment) => comment._id === commentId);

//       if (commentToEdit) {
//         setEditCommentText(commentToEdit.text); 
//         setEditingCommentId(commentId);
//       }
     
//     }
//   };

//   const [deleteComment] = useMutation(DELETE_COMMENT, {
//     onCompleted: (data) => {
//       console.log("Comment deleted");
//     },
//     onError: (error) => {
//       console.error("Error deleting comment:", error);
//     },
//   });

//   const handleDeleteComment = (commentId) => {
//     const postId = comments.find((comment) => comment._id === commentId)?.postId;
  
//     if (!postId) {
//       console.error("postId not found for commentId:", commentId);
//       return;
//     }
  
//     setShowModal(true);
//     setSelectedCommentId(commentId);
  
//     deleteComment({
//       variables: {
//         postId: postId,
//         commentId: commentId,
//       },
//     });
//   };

//   const handleDeleteConfirmed = () => {
//     deleteComment({
//       variables: {
//         postId: postId, 
//         commentId: selectedCommentId,
//       },
//     });
//     setShowModal(false);
//   };

//   const commentButtonStyle = {
//     background: "none",
//     color: "grey",
//     border: "none",
//     padding: "1rem 2rem 1rem 0",
//     cursor: "pointer",
//   };

//   return (
//     <div>
//       <h4 className="my-3">
//         <strong>Comments</strong>
//       </h4>
  
//       <Container>
//         {comments.map((comment) => (
//           <CommentCard key={comment._id}>
//             <div className="comment-details">
//             <strong>
//         {comment.author ? comment.author.username : "Unknown User"}
//       </strong>
//                     <small>{new Date(comment.dateCreated).toLocaleString()}</small>
//             </div>

//             <div className="card-body">
//          // Inside the map function that renders comments
// {editingCommentId === comment._id ? (
//   <div>
//     <textarea
//       value={editCommentText}
//       onChange={(e) => setEditCommentText(e.target.value)}
//       style={{ width: "100%" }}
//     />
//     <br />
//     <button
//       onClick={() => handleEditComment(comment._id)}
//       style={commentButtonStyle}
//     >
//       Save
//     </button>
//   </div>
// ) : (
//   <div>
//     {comment.text}
//     <br />
//     <button
//       onClick={() => handleEditComment(comment._id)}
//       style={commentButtonStyle}
//     >
//       <FontAwesomeIcon icon={faEdit} /> Edit
//     </button>
//     <button
//       onClick={() => handleDeleteComment(comment._id)}
//       style={commentButtonStyle}
//     >
//       <FontAwesomeIcon icon={faTrash} /> Delete
//     </button>
//   </div>
// )}

//             </div>
//           </CommentCard>
//         ))}
//       </Container>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete this comment?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDeleteConfirmed}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default CommentList;