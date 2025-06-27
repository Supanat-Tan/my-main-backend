const toDoModel = require('../models/toDoModel');

const getAllToDo = async (req, res) => {

    try {
        const data = await toDoModel.find();
        res.status(200).json({ data });
    }

    catch(err) {
        res.status(400).json({ error: err.message })
        console.log('Error finding todo list: ', err)
    }
}

const toDoCreate = async (req, res) => {
    const { todo } = req.body;

    try {
        const data = await toDoModel.create({ todo });
        res.status(200).json({ data });
    }
    catch(err) {
        res.status(400).json({ error: err.message });
        console.log('Error creating todo list: ', err)
    }
}

const deleteToDo = async (req, res) => {
    const id = req.params.id;
    try {
        const todo = await toDoModel.findByIdAndDelete(id);
        if (!todo) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(todo);
    } catch (err) {
        console.log('Error Deleting todo Id: ', id);
    }
}

module.exports = {
    getAllToDo,
    toDoCreate,
    deleteToDo,
}