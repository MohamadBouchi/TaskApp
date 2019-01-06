const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userTaskSchema = new Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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