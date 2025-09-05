const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const auth = async (req, res, next) => {
  // For local storage
  //const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  //Cookies setup
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ error: 'Authorization token required' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified._id, {
      password: 0,
    }).populate('orderHistory')

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    
    next();

  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;