import React from 'react';
//used to send client requests; hooks frontend code up with API
import axios from 'axios';
import { Row, Col, Button} from 'react-bootstrap';

import './main-view.scss';

import { BrowserRouter as Router, Route} from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../profile-edit-view/profile-edit-view';
import { NavView } from '../nav-view/nav-view';

export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor so React can initialize it
    super();

    // Initial state set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  //When a user successfully logs in, this function updates the `user` property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  //stores web token in browser to keep users logged in
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  getMovies(token) {
    axios.get('https://starwarscentral.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies, user } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
        <NavView user={user} />
        <Row className="justify-content-md-center">
          <div className="main-view">
            <Col md={8}>
              <Route exact path="/" render={() => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                }
              }/>
            </Col>
            <Route path="/register" render={() => <RegistrationView />} />
            <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m}/>)}/>
            <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
            <Route path="/genres/:name" render={({match}) => 
              <GenreView 
                genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}
                movies={movies.filter((m) => m.Genre.Name === match.params.name)} 
              />
            }/>
            <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view"/>;
              return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
              } />
            <Route exact path='/users/:username' render={() => <ProfileView movies={movies} />} />
            <Route path='/users/:username/update' render={() => <UpdateProfile movies={movies} />} />
          </div>
        </Row>
      </Router>
    );
  }
}