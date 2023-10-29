import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER_EMAIL, LOGIN_USER_USERNAME } from '../utils/mutations';


const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ login: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [emailLogin, { error: emailError }] = useMutation(LOGIN_USER_EMAIL); 
  const [usernameLogin, { error: usernameError }] = useMutation(LOGIN_USER_USERNAME); 


  useEffect(() => {
    if (emailError || usernameError) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [emailError, usernameError]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      let data;
      if (userFormData.login.includes('@')) {
        data = await emailLogin({
          variables: {
            email: userFormData.login,
            password: userFormData.password,
          },
        });
      } else {
        data = await usernameLogin({
          variables: {
            username: userFormData.login,
            password: userFormData.password,
          },
        });
      }

      Auth.login(userFormData.login.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      login: "",
      password: "",
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email or Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email or username'
            name='login'
            onChange={handleInputChange}
            value={userFormData.login}
            required
          />
          <Form.Control.Feedback type='invalid'>Email or username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
  disabled={!(userFormData.login && userFormData.password)}
  type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;