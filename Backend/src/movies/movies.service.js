const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

function addCritic(review) {
  return knex("critics")
    .where({ "critics.critic_id": review.critic_id })
    .select("critics.*")
    .then((critics) => {
      review.critic = critics[0];
      return review;
    });
}

function listReviews(movie_id) {
  return knex("reviews")
    .select("*")
    .where({ movie_id })
    .then((reviews) => Promise.all(reviews.map(addCritic)))
    .then(mapProperties({ critic: "critic" }))
    .then((reviews) => Object.values(reviews))
}

function read(movie_id){
    return knex("movies").select("*").where({movie_id}).first()
}

function listTheaters(movie_id){
    return knex("movies_theaters")
        .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
        .select("theaters.name")
        .where({movie_id});
}

function listMovies(){
    return knex("movies").select("*")
}

function listShowingMovies() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .where("movies_theaters.is_showing", true)
    .distinct("movies.title")
    .select("movies.*")
}

module.exports ={
    read,
    listTheaters,
    listReviews,
    listMovies,
    listShowingMovies
}