import React from 'react';

class Movie extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        {this.props.movies
          ? this.props.movies.map((movie, idx) => {
              return (
                <div key={idx}>
                  <img src={movie.image_url} alt="movie poster" />
                  <p>{movie.title}</p>
                  <p>{movie.overview}</p>
                  <p>{movie.averageVotes}</p>
                  <p>{movie.totalVotes}</p>
                  <p>{movie.popularity}</p>
                  <p>{movie.released_on}</p>
                </div>
              );
            })
          : null}
      </>
    );
  }
}

export default Movie;
