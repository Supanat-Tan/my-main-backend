const toDoModel = require('../models/toDoModel');

const toDoCreate = async (req, res) => {
    const { todo } = req.body;

    try {
        const data = await toDoModel.create({ todo });
        res.status(200).json({ data })
    }
    catch(err) {
        res.status(400).json({ error: err.message });
        console.log('Error creating todo list: ', err)
    }
}

module.exports = {
    toDoCreate,
}