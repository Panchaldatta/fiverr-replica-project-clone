
const mongoose = require('mongoose');

const EarningsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount']
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order'
  },
  status: {
    type: String,
    enum: ['pending', 'available', 'withdrawn'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Earnings', EarningsSchema);
