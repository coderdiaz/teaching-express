const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

// Methods for authentication
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Finding the user by email
  const user = await User.findOne({ email }).exec();

  // If user not exists the request is rejected with Unauthorized
  if (!user) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
    });
  }

  // Verify if password match
  user.comparePassword(password, (err, isMatch) => {
    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized',
      });
    }

    // Generating token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });

    // Returning access token
    return res.status(200).json({
      status: 200,
      token,
    });
  });
});

router.post('/signup', async (req, res) => {
  const { name, lastname, email, password } = req.body;
  // TODO: Validate required fields

  // Getting the user by email
  let user = await User.findOne({ email }).exec();

  // Validating if the user exists
  if (user) {
    return res.status(400).json({
      status: 400,
      message: 'This email is already registered',
    });
  }

  // Creating user if not exists
  user = new User({
    name,
    lastname,
    type: 'reader',
    email,
    password,
  });
  await user.save(); // Saving the user data

  return res.status(201).json({
    status: 201,
    message: 'Your account was created sucesssfully',
  });
});

module.exports = router;
