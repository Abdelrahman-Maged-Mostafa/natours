const Booking = require('../models/bookingModel');
const Tour = require('../models/tourmodel');
// const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
// exports.home = (req, res) => {
//   res.status(200).render('base', {
//     title: 'Exciting tours for adventurous people',
//     tour: 'The Forest Hiker',
//     user: 'Poda',
//   });
// };

exports.overview = catchAsync(async (req, res) => {
  const tours = await Tour.find();
  res.status(200).render('overview', { title: 'All Tours', tours });
});

exports.tour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });
  if (!tour) return next(new AppError('No tour found with that Name', 404));
  res.status(200).render('tour', { title: `${tour.name} Tour`, tour });
});

exports.login = catchAsync(async (req, res) => {
  // const tours = await Tour.find();
  res.status(200).render('login', { title: 'Log into your account' });
});

exports.getAccount = catchAsync(async (req, res) => {
  // const tours = await Tour.find();
  res.status(200).render('account', { title: 'Your account' });
});

exports.getMyTours = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id });
  const tourIds = bookings.map((el) => el.tour._id);
  const tours = await Tour.find({ _id: { $in: tourIds } });
  console.log(tours);
  // const tours = await Tour.find();
  res.status(200).render('overview', { title: 'My tours', tours });
});

// exports.updateUserData = catchAsync(async (req, res, next) => {
//   const { name, email } = req.body;
//   const newUser = await User.findByIdAndUpdate(
//     req.user.id,
//     { name, email },
//     { new: true, runValidators: true },
//   );
//   if (!newUser) return next(new AppError('Some Error Founded! Please try again.', 404));
//   res.status(200).json({ status: 'success', user: newUser });
// });
