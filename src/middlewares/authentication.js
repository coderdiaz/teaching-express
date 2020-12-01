const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const authentication = (req, res, next) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ status: 401, message: 'Unauthorized' });

    const user = await User.findOne({ email: decoded.email }).exec();
    req.user = {
      id: user._id,
      email: user.email,
      type: user.type,
    };

    next();
  });
}

module.exports = authentication;
