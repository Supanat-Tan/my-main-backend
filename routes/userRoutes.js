const express = require('express');
const { loginUser, signupUser } = require('../controllers/userControllers')

const router = express.Router();

//Sign-Up
router.post('/signup', signupUser)

router.post('/login', loginUser)

module.exports = router;