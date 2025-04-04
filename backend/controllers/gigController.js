
const Gig = require('../models/Gig');

// @desc    Get all gigs
// @route   GET /api/gigs
// @access  Public
exports.getGigs = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Gig.find(JSON.parse(queryStr)).populate({
      path: 'user',
      select: 'username displayName photoURL'
    });

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Gig.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const gigs = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: gigs.length,
      pagination,
      data: gigs
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get gigs by category
// @route   GET /api/gigs/category/:category
// @access  Public
exports.getGigsByCategory = async (req, res, next) => {
  try {
    const gigs = await Gig.find({ category: req.params.category })
      .populate({
        path: 'user',
        select: 'username displayName photoURL'
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: gigs.length,
      data: gigs
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single gig
// @route   GET /api/gigs/:id
// @access  Public
exports.getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id).populate({
      path: 'user',
      select: 'username displayName photoURL bio'
    }).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'username displayName photoURL'
      }
    });

    if (!gig) {
      return res.status(404).json({
        success: false,
        error: 'Gig not found'
      });
    }

    res.status(200).json({
      success: true,
      data: gig
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new gig
// @route   POST /api/gigs
// @access  Private
exports.createGig = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const gig = await Gig.create(req.body);

    res.status(201).json({
      success: true,
      data: gig
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update gig
// @route   PUT /api/gigs/:id
// @access  Private
exports.updateGig = async (req, res, next) => {
  try {
    let gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        error: 'Gig not found'
      });
    }

    // Make sure user is gig owner
    if (gig.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'User not authorized to update this gig'
      });
    }

    gig = await Gig.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: gig
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete gig
// @route   DELETE /api/gigs/:id
// @access  Private
exports.deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        error: 'Gig not found'
      });
    }

    // Make sure user is gig owner
    if (gig.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'User not authorized to delete this gig'
      });
    }

    await gig.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
