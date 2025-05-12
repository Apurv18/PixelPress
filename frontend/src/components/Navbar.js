import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Image, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

function decodeJwt(token) {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}

function NavigationBar({ theme, toggleTheme, user, setUser }) {
  const [showLogin, setShowLogin] = useState(false);
  const userInfo = user && user.credential ? decodeJwt(user.credential) : null;

  const handleAvatarClick = () => {
    setShowLogin(true);
  };

  const handleClose = () => setShowLogin(false);

  return (
    <>
      <Navbar fixed="top" expand="lg" className={`custom-navbar shadow-sm ${theme}`} style={{ background: '#fff' }}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 p-0 m-0">
            <img src="/pixelpress-logo.png" alt="PixelPress Logo" style={{ height: 54, width: 'auto', marginRight: 0, marginLeft: 0, padding: 0 }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto align-items-center gap-2">
              <Nav.Link as={Link} to="/compress" className="nav-link-custom">
                <Button className="rounded-pill px-4 py-2 compress-btn">Compress Image</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link>
              <button
                className="theme-toggle-btn btn btn-link"
                onClick={toggleTheme}
                aria-label="Toggle dark/light mode"
                style={{ fontSize: 22 }}
              >
                {theme === 'dark' ? (
                  <span role="img" aria-label="Light mode">🌞</span>
                ) : (
                  <span role="img" aria-label="Dark mode">🌙</span>
                )}
              </button>
              <span style={{ cursor: 'pointer' }} onClick={handleAvatarClick}>
                {userInfo && userInfo.picture ? (
                  <Image src={userInfo.picture} roundedCircle width={40} height={40} alt="Profile" />
                ) : (
                  <Image src="https://ui-avatars.com/api/?name=User" roundedCircle width={40} height={40} alt="Profile" />
                )}
              </span>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLogin} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{userInfo ? 'Account' : 'Sign in to PixelPress'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {!userInfo ? (
            <GoogleLogin
              onSuccess={credentialResponse => {
                setUser(credentialResponse);
                setShowLogin(false);
              }}
              onError={() => {
                alert('Login Failed');
              }}
              size="large"
              shape="circle"
            />
          ) : (
            <>
              <Image src={userInfo.picture} roundedCircle width={60} height={60} alt="Profile" className="mb-3" />
              <div className="mb-3">{userInfo.name}<br /><span style={{ fontSize: 13, color: '#888' }}>{userInfo.email}</span></div>
              <button
                className="btn btn-danger"
                onClick={() => {
                  googleLogout();
                  setUser(null);
                  setShowLogin(false);
                }}
              >
                Logout
              </button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavigationBar; 