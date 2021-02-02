import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './genre-view.scss';


export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { genre } = this.props;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <br />
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
        <br />
        <Link to={'/'}>
          <Button variant="primary">Back</Button>
        </Link>
      </div>
    );
  }
}