const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const auth = (req, res, next) => {
  // For local storage
  //const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  //Cookies setup
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ error: 'Authorization token required' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();

  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;