const service = require("./reviews.service.js")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function updateReview(req, res) {
  const reviewId = req.params.reviewId;
  const { score, content } = req.body.data;

  const updatedData = {
    score,
    content
  };

  const updatedReview = await service.update(reviewId, updatedData);
  res.json({ data: updatedReview });
}


async function notFound (req, res, next){
    const review = await service.read(req.params.reviewId)
    if (review){
        res.locals.review = review
        return next()
    }
    next({status:404, message:'Review cannot be found.'})
}

async function destroy(req, res) {
    const {review} = res.locals
    await service.destroy(review.review_id)
    res.sendStatus(204)
  
  }

module.exports ={
    updateReview:[asyncErrorBoundary(notFound),
         asyncErrorBoundary(updateReview)],
    delete:[asyncErrorBoundary(notFound),
         asyncErrorBoundary(destroy)]
}