const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Create user
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.json({
    success: true,
    message: 'User created successfully',
    data: user
  });
});

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json({
    success: true,
    message: 'All users fetched successfully',
    data: users
  });
});

// Get single user by id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({
    success: true,
    message: 'User fetched successfully',
    data: user
  });
});

module.exports = router;
