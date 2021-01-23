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
      <Navbar collapseOnSelect expand="lg" sticky="top" bg="dark" variant="dark">
        <Navbar.Brand href="/">Star Wars Central</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <Link to={'/users/:Username'}>
              <Button 
                className="profile-button" 
                variant="light"
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
        </Navbar.Collapse>
      </Navbar>
    );
  }
}