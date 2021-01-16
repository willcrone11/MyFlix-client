import React from 'react';
//used to send client requests; hooks frontend code up with API
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

  constructor() {
    // Call the superclass constructor so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {};
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    return (
      <div className="main-view"></div>
    );
  }
}