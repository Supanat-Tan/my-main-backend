const express = require('express');
const { getAllToDo, toDoCreate, deleteToDo } = require('../controllers/toDoControllers')

const router = express.Router();

router.get('/findall', getAllToDo)
router.post('/create', toDoCreate)
router.delete('/delete/:id', deleteToDo)

module.exports = router;