import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#trips" className="text-dark">Home</Nav.Link>
    <Nav.Link href="#change-password" className="text-dark">Change Password</Nav.Link>
    <Nav.Link href="#sign-out" className="text-dark">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up" className="text-dark">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in" className="text-dark">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="light" variant="light" expand="md">
    <Navbar.Brand href="#trips">
      🌎 Trek
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2 text-primary">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
