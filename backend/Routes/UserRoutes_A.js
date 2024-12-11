const express = require('express');
const router = express.Router();

// Insert model
const User_A = require('../Models/UserModel_A');

// Insert user_A controllers
const UserController = require('../Controllers/UserContrller_A');

// Controller function to get all incidents (users)
UserController.getAllUsers = async (req, res) => {
  try {
    const incidents = await User_A.find(); // Fetching all incidents (users)
    res.status(200).json({ incidents }); // Sending incidents in correct format
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

router.get('/', UserController.getAllUsers);
router.post('/', UserController.addUsers);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.updateUser_A);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
