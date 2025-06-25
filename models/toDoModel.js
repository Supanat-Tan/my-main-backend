const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema(
    {
        todo: {
            type: 'string',
            required: true,
        },
    },

    {
        timestamps: true,
        collection: 'todoList'
    }
);

const ToDo = mongoose.model('ToDo', toDoSchema);
module.exports = ToDo