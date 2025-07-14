const express = require('express');
const auth = require('../middleware/auth')
const { getAllToDo, toDoCreate, toDoUpdate, deleteToDo } = require('../controllers/toDoControllers')

const router = express.Router();

//Require Auth to access todo routes
router.use(auth);

router.get('/:id', getAllToDo)
router.post('/', toDoCreate)
router.patch('/:id', toDoUpdate)
router.delete('/:id', deleteToDo)

module.exports = router;