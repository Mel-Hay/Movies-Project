const service = require("./movies.service.js")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function read(req, res){
    res.json({data: await service.read(req.params.movieId)})
}

async function listTheaters(req, res){
    res.json({data: await service.listTheaters(req.params.movieId)})
}

async function listReviews(req, res){
    res.json({data: await service.listReviews(req.params.movieId) })
}

async function notFound (req, res, next){
    const movie = await service.read(req.params.movieId)
    if (movie){
        res.locals.movie = movie
        return next()
    }
    next({status:404, message:'Movie could not be found.'})
}

async function listMovies(req, res) {
  const { is_showing } = req.query;
  if (is_showing) {
    let showingMovies = await service.listShowingMovies();
    res.json({ data: showingMovies });
  } else {
    let allMovies = await service.listMovies();
    res.json({ data: allMovies });
  }
}

module.exports = {
    read:[asyncErrorBoundary(notFound), asyncErrorBoundary(read)],
    listTheaters:[asyncErrorBoundary(notFound), asyncErrorBoundary(listTheaters)], 
    listReviews:[asyncErrorBoundary(notFound), asyncErrorBoundary(listReviews)],
    listMovies:[asyncErrorBoundary(listMovies)],
}