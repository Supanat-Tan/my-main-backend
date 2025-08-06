const express = require('express');
const { loginUser, signupUser, logoutUser } = require('../controllers/userControllers')

const router = express.Router();

//Sign-Up
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;