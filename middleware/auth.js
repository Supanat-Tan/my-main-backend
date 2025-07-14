const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ error: 'Authorization token required' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();

  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = auth;