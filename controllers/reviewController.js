const Review = require('../models/reviewModel');
const { deleteOne, updateOne, createOne, getOne, getAll } = require('./handlerFactory');

exports.setTourAndUserId = (req, res, next) => {
  // exports.testTour = new Tour({ name: 'The Park Camper', price: 997 });
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.getAllReviews = getAll(Review);
exports.getReview = getOne(Review);
exports.createReview = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
