import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../shared/ErrorAlert";
import { listMovies } from "../utils/api";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchMovies() {
      try {
        const moviesData = await listMovies(abortController.signal);
        setMovies(moviesData);
      } catch (error) {
        setError(error);
      }
    }
    fetchMovies();

    return () => abortController.abort();
  }, []);
 

  const list = movies.map((movie) => (
    <article key={movie.movie_id} className="col-sm-12 col-md-6 col-lg-3 my-2">
      <img
        alt={`${movie.title} Poster`}
        className="rounded"
        src={movie.image_url}
        style={{ width: "100%" }}
      />
      <Link
        to={`/movies/${movie.movie_id}`}
        className="stretched-link text-dark"
      >
        <h3 className="font-poppins-heading text-center mt-2">{movie.title}</h3>
      </Link>
    </article>
  ));

  return (
    <main className="container">
      <ErrorAlert error={error} />
      <h2 className="font-poppins">Now Showing</h2>
      <hr />
      <section className="row">{list}</section>
    </main>
  );
}

export default MoviesList;
