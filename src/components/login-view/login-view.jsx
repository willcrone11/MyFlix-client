import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './login-view.scss';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://starwarscentral.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <React.Fragment>
      <Form className='form-login'>
        <h1 className='text-primary'>Welcome to myFlix!</h1>
        <p className='mb-5'>Please login to continue.</p>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Username'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Enter Password'
          />
        </Form.Group>
        <Button onClick={handleSubmit} variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <div className="no-account">
        <span>Don't Have an Account?</span>
          <Link to={`/register`}>
            <Button variant="link">Register Here</Button>
          </Link>
      </div>
    </React.Fragment>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func,
};