import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  text-align: center;
  margin-top: 4rem;
`;

const NotFoundText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  font-size: 18px;
  margin-bottom: 30px;
`;

const GoBackButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <NotFoundText>Post Deleted!</NotFoundText>
      <ErrorMessage>This post doesn't exist.</ErrorMessage>
      <GoBackButton to="/">Go back home</GoBackButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
