import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import { Link } from 'react-router-dom';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; 
function AppNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState (false);
  const [activeModal, setActiveModal] = useState('login');
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
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
    setIsMenuOpen(!isMenuOpen); 
  };


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <div className="d-flex justify-content-between w-100">
            <Navbar.Brand as={Link} to="/">
              <FontAwesomeIcon icon={faFilter} style={{ marginRight: '1rem' }} />
              <strong><span>TL;DR</span></strong>
            </Navbar.Brand>
            <div>
              <NavbarToggle aria-controls="basic-navbar-nav" onClick={handleMenuToggle}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} /> 
              </NavbarToggle>
            </div>
          </div>
          <NavbarCollapse id="basic-navbar-nav" expanded={expanded}>
            <Nav className="ml-auto">
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
                  <Nav.Link onClick={handleShowSignupModal}>Signup</Nav.Link>
                </>
              )}
            </Nav>
          </NavbarCollapse>
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
}

export default AppNavbar;
