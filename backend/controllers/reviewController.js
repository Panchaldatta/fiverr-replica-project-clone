
const Review = require('../models/Review');
const Gig = require('../models/Gig');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate({
      path: 'user',
      select: 'username displayName photoURL'
    }).populate({
      path: 'gig',
      select: 'title'
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get reviews for a gig
// @route   GET /api/gigs/:gigId/reviews
// @access  Public
exports.getGigReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gig: req.params.gigId }).populate({
      path: 'user',
      select: 'username displayName photoURL'
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate({
      path: 'user',
      select: 'username displayName photoURL'
    }).populate({
      path: 'gig',
      select: 'title'
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add review to a gig
// @route   POST /api/gigs/:gigId/reviews
// @access  Private
exports.addReview = async (req, res, next) => {
  try {
    // Add user and gig to req.body
    req.body.user = req.user.id;
    req.body.gig = req.params.gigId;

    // Check if gig exists
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) {
      return res.status(404).json({
        success: false,
        error: 'Gig not found'
      });
    }

    // Check if user has already reviewed this gig
    const existingReview = await Review.findOne({ 
      user: req.user.id, 
      gig: req.params.gigId 
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        error: 'You have already reviewed this gig'
      });
    }

    // Create review
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    // Make sure review belongs to user
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this review'
      });
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this review'
      });
    }

    await review.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
