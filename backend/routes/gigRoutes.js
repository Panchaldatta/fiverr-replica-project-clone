
const express = require('express');
const { 
  getGigs, 
  getGig, 
  createGig, 
  updateGig, 
  deleteGig,
  getGigsByCategory
} = require('../controllers/gigController');
const { protect } = require('../middleware/authMiddleware');

// Include review router
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Re-route into review router
router.use('/:gigId/reviews', reviewRouter);

router.get('/', getGigs);
router.get('/category/:category', getGigsByCategory);
router.post('/', protect, createGig);
router.get('/:id', getGig);
router.put('/:id', protect, updateGig);
router.delete('/:id', protect, deleteGig);

module.exports = router;
