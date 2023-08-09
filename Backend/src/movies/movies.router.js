const router = require("express").Router({mergeParams: true})
const controller= require("./movies.controller")

router.route("/").get(controller.listMovies)
    
router.route("/:movieId").get(controller.read)

router.route("/:movieId/theaters").get(controller.listTheaters)

router.route("/:movieId/reviews").get(controller.listReviews)

module.exports = router