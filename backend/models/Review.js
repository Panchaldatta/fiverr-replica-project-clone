
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  text: {
    type: String,
    required: [true, 'Please add a review text'],
    trim: true,
    maxlength: [500, 'Review can not be more than 500 characters']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  gig: {
    type: mongoose.Schema.ObjectId,
    ref: 'Gig',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent user from submitting more than one review per gig
ReviewSchema.index({ gig: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function(gigId) {
  const obj = await this.aggregate([
    {
      $match: { gig: gigId }
    },
    {
      $group: {
        _id: '$gig',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 }
      }
    }
  ]);

  try {
    await this.model('Gig').findByIdAndUpdate(gigId, {
      rating: obj[0] ? obj[0].averageRating : 0,
      reviewCount: obj[0] ? obj[0].reviewCount : 0
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
ReviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.gig);
});

// Call getAverageRating before remove
ReviewSchema.pre('remove', function() {
  this.constructor.getAverageRating(this.gig);
});

module.exports = mongoose.model('Review', ReviewSchema);
