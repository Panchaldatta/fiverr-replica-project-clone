
const express = require('express');
const { 
  getOrders, 
  getOrder, 
  createOrder, 
  updateOrder, 
  getBuyerOrders,
  getSellerOrders
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All order routes are protected

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/buyer', getBuyerOrders);
router.get('/seller', getSellerOrders);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);

module.exports = router;
