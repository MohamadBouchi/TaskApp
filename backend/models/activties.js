const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    taskTitle: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    changeDate: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Activity', activitySchema);