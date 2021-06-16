import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

import './nav-view.scss';


export class NavView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  logOut(user) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open("/", "_self");
  }

  render() {
    const { user } = this.props;

    if (!user) return null;

    return( 
      <Navbar 
        collapseOnSelect 
        expand="lg" 
        sticky="top" 
        bg="light" 
        variant="light" 
        className="navbar"
      >
        <Navbar.Brand 
          id="logo-text" 
          href="/"
        >
          <img 
            src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo.png" 
            id="logo">
          </img> 
          central
        </Navbar.Brand>
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <Link to={'/users/:Username'}>
              <Button 
                className="profile-button" 
                variant="dark"
              >
                Profile
              </Button>
            </Link>
          </Nav>
          <Nav>
            <Link to={'/'}>
              <Button 
                className="logout-button" 
                variant="primary" 
                onClick={this.logOut}
              >
                Log Out
              </Button>
            </Link>
          </Nav>
        
      </Navbar>
    );
  }
}