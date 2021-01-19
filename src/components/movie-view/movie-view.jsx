import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
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