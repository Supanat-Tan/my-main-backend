const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema(
    {
        todo: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
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