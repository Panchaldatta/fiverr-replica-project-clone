
const express = require('express');
const { 
  getReviews, 
  getGigReviews,
  getReview, 
  addReview, 
  updateReview, 
  deleteReview 
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(getReviews)
  .post(protect, addReview);

router.route('/:id')
  .get(getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
