
const Order = require('../models/Order');
const Gig = require('../models/Gig');
const Earnings = require('../models/Earnings');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate({
      path: 'buyer seller gig',
      select: 'username displayName title price'
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: 'buyer seller gig',
      select: 'username displayName title price image'
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Make sure user is buyer or seller
    if (
      order.buyer.toString() !== req.user.id &&
      order.seller.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    // Get gig information
    const gig = await Gig.findById(req.body.gig).populate('user');

    if (!gig) {
      return res.status(404).json({
        success: false,
        error: 'Gig not found'
      });
    }

    // Cannot order your own gig
    if (gig.user.id === req.user.id) {
      return res.status(400).json({
        success: false,
        error: 'You cannot order your own gig'
      });
    }

    // Set buyer and seller
    req.body.buyer = req.user.id;
    req.body.seller = gig.user._id;
    req.body.price = gig.startingPrice;

    // Calculate delivery date (default 3 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    req.body.deliveryTime = deliveryDate;

    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private
exports.updateOrder = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Make sure user is buyer or seller
    if (
      order.buyer.toString() !== req.user.id &&
      order.seller.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this order'
      });
    }

    // Only allow certain fields to be updated based on user role
    const allowedBuyerUpdates = ['requirements'];
    const allowedSellerUpdates = ['status'];

    const updateData = {};

    // Check if user is buyer
    if (order.buyer.toString() === req.user.id) {
      Object.keys(req.body).forEach(key => {
        if (allowedBuyerUpdates.includes(key)) {
          updateData[key] = req.body[key];
        }
      });
    } 
    // Check if user is seller
    else if (order.seller.toString() === req.user.id) {
      Object.keys(req.body).forEach(key => {
        if (allowedSellerUpdates.includes(key)) {
          updateData[key] = req.body[key];
        }
      });

      // Create earnings record when order is completed
      if (req.body.status === 'completed' && order.status !== 'completed') {
        await Earnings.create({
          user: order.seller,
          amount: order.price,
          order: order._id,
          status: 'pending'
        });
      }
    }

    order = await Order.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get orders where user is buyer
// @route   GET /api/orders/buyer
// @access  Private
exports.getBuyerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate({
        path: 'seller gig',
        select: 'username displayName title price image'
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get orders where user is seller
// @route   GET /api/orders/seller
// @access  Private
exports.getSellerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ seller: req.user.id })
      .populate({
        path: 'buyer gig',
        select: 'username displayName title price image'
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};
