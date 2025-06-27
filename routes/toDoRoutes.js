const express = require('express');
const { getAllToDo, toDoCreate } = require('../controllers/toDoControllers')

const router = express.Router();

router.get('/findall', getAllToDo)
router.post('/create', toDoCreate)

module.exports = router;