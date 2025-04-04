
const User = require('../models/User');
const Gig = require('../models/Gig');
const Earnings = require('../models/Earnings');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    // Make sure user is updating their own profile
    if (req.user.id !== req.params.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this profile'
      });
    }

    // Fields to update
    const fieldsToUpdate = {
      displayName: req.body.displayName,
      bio: req.body.bio,
      skills: req.body.skills,
      photoURL: req.body.photoURL
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = async (req, res, next) => {
  try {
    // Make sure user is deleting their own profile
    if (req.user.id !== req.params.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this profile'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user gigs
// @route   GET /api/users/:id/gigs
// @access  Public
exports.getUserGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      count: gigs.length,
      data: gigs
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user earnings
// @route   GET /api/users/:id/earnings
// @access  Private
exports.getUserEarnings = async (req, res, next) => {
  try {
    // Make sure user is viewing their own earnings
    if (req.user.id !== req.params.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to view these earnings'
      });
    }

    const earnings = await Earnings.find({ user: req.params.id });
    
    // Calculate totals
    const total = earnings.reduce((acc, curr) => acc + curr.amount, 0);
    const pending = earnings
      .filter(e => e.status === 'pending')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const available = earnings
      .filter(e => e.status === 'available')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const withdrawn = earnings
      .filter(e => e.status === 'withdrawn')
      .reduce((acc, curr) => acc + curr.amount, 0);

    res.status(200).json({
      success: true,
      data: {
        earnings,
        summary: {
          total,
          pending,
          available,
          withdrawn
        }
      }
    });
  } catch (err) {
    next(err);
  }
};
