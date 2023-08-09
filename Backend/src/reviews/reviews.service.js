const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")


function update(reviewId, updatedData) {
  return knex("reviews")
    .where({ review_id: reviewId })
    .update(updatedData)
    .then(() => {
      return knex("reviews")
        .where({ review_id: reviewId })
        .first()
        .then(addCritic);
    })
    .then(mapProperties({
      critic: "critic",
    }));
}

function addCritic(review) {
  return knex("critics")
    .where({ "critics.critic_id": review.critic_id })
    .select("critics.*")
    .then((critics) => {
      review.critic = critics[0];
      return review;
    });
}


function read(review_id){
    return knex("reviews").select("*").where({review_id}).first()
}

function destroy(review_id){
    return knex("reviews").where({review_id}).del()
}

  module.exports={
    update,
    read,
    destroy
  }