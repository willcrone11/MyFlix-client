import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  addFaveMovie(movie) {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

    if (confirm('Add to list of Favorites?')) return (
    axios({
        method: 'post',
        url: `https://starwarscentral.herokuapp.com/users/${userName}/movies/${movie._id}`,
        headers: { Authorization: `Bearer ${token}` }
    })
            .then((response) => {
                console.log(response);
        alert('You have added this movie to your list of Favorites.');
    })
)
}

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <Card style={{ width: '18rem' }}>
          <Card.Img className="movie-poster" src={movie.ImagePath} />
          <Card.Body>
            <div className="movie-title">
              <Card.Title>Title: {movie.Title}</Card.Title>
            </div>
            <Card.Text>
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Genre: </span>
              <span className="value">{movie.Genre.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Director: </span>
              <span className="value">{movie.Director.Name}</span>
            </Card.Text>
            <Button onClick={() => onClick()} variant='primary'>
              Back
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
  }).isRequired
};