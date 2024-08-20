const express = require('express');
const { overview, tour, login, getAccount, getMyTours } = require('../controllers/viewsController');
const { isLoggedIn, protect } = require('../controllers/authController');
const { createBookingCheckout } = require('../controllers/bookingController');

const router = express.Router();

// router.get('/', home);

router.get('/me', protect, getAccount);
router.get('/me-tours', protect, getMyTours);
router.use(isLoggedIn);

router.get('/', createBookingCheckout, overview);
router.get('/tours/:slug', tour);
router.get('/login', login);

module.exports = router;
