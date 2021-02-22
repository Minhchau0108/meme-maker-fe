import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faImages } from "@fortawesome/free-solid-svg-icons";
const PublicNavbar = () => {
  return (
    <Navbar
      bg='primary'
      expand='md'
      variant='dark'
      className='sticky-top p-0 shadow'
    >
      <Navbar.Brand className='col-md-3 mr-0 px-3'>Meme Generator</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='m-auto'>
          <Nav.Link as={Link} to='/'>
            <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
            Create Meme
          </Nav.Link>
          <Nav.Link as={Link} to='/gallery'>
            <FontAwesomeIcon icon={faImages} className='mr-2' />
            Gallery
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
