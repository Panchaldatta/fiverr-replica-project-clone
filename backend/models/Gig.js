
const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title can not be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description can not be more than 1000 characters']
  },
  image: {
    type: String,
    default: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/edcf8fc8b9aecaa25ce6c68d641f5e367e9ce636.png'
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Web Development',
      'Graphic Design',
      'Digital Marketing',
      'Writing & Translation',
      'Video & Animation'
    ]
  },
  startingPrice: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [5, 'Price must be at least $5']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate with virtuals
GigSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'gig',
  justOne: false
});

module.exports = mongoose.model('Gig', GigSchema);
