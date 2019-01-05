const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userTaskSchema = new Schema({
    taskId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    changeDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('UserTask', userTaskSchema);