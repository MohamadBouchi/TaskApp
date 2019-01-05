const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('Task', taskSchema);