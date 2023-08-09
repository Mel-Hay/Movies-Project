const knex = require("../db/connection");

function addMovie(theater) {
    return knex("movies")
      .join(
        "movies_theaters",
        "movies.movie_id",
        "movies_theaters.movie_id"
      )
      .where({ "movies_theaters.theater_id": theater.theater_id })
      .select("movies.*")
      .then((movies) => {
        const theaterWithMovies = {
          ...theater,
          movies: movies.map((movie) => ({
            ...movie,
            theater_id: theater.theater_id,
          })),
        };
        return theaterWithMovies;
      });
  }

  function listTheaters() {
    return knex("theaters")
      .then((theaters) => {
        const addMoviesPromises = theaters.map((theater) => addMovie(theater));
        return Promise.all(addMoviesPromises);
      })
  }


module.exports = {
  listTheaters
};
