
const express = require('express');
const { 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser,
  getUserGigs,
  getUserEarnings
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);
router.get('/:id/gigs', getUserGigs);
router.get('/:id/earnings', protect, getUserEarnings);

module.exports = router;
