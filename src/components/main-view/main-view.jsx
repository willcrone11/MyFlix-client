import React from 'react';
//used to send client requests; hooks frontend code up with API
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null
      user: null,
      register: null
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://starwarscentral.herokuapp.com/movies')
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //When a user successfully logs in, this function updates the `user` property in state to that particular user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //if user is not registered, register view is rendered
    if (!register)
      return (
        <RegistrationView onRegister={(register) => this.onRegister(register)} />
      );

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
          ))
        }
      </div>
    );
  }
}