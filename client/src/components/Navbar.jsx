import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState('login');
  const [menuExpanded, setMenuExpanded] = useState(false);

  const handleShowLoginModal = () => {
    setActiveModal('login');
    setShowModal(true);
  };

  const handleShowSignupModal = () => {
    setActiveModal('signup');
    setShowModal(true);
  };

  const handleMenuToggle = () => {
    setMenuExpanded(!menuExpanded);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" onToggle={handleMenuToggle} expanded={menuExpanded}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            summed up
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
            <Nav className="ml-auto d-flex">
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/me">
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={handleShowLoginModal}>Login</Nav.Link>
                  <Nav.Link onClick={handleShowSignupModal}>Sign Up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Tab.Container activeKey={activeModal} onSelect={() => {}}>
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login" onClick={handleShowLoginModal}>
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup" onClick={handleShowSignupModal}>
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
