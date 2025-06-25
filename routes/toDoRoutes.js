const express = require('express');
const { toDoCreate } = require('../controllers/toDoControllers')

const router = express.Router();

router.post('/create', toDoCreate)

module.exports = router;