const router = require("express").Router({mergeParams: true})
const controller= require("./reviews.controller")


router.route("/:reviewId")
    .put(controller.updateReview)
    .delete(controller.delete)
  

module.exports = router