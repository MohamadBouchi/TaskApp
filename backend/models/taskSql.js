const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSqlSchema = new Schema({
    sql: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TaskSql', taskSqlSchema);