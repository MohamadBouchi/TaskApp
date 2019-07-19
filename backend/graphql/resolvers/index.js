const usersResolver = require('./users');
const tasksResolver = require('./tasks');
const usersTasksResolver = require('./userTasks');
const activitiesResolver = require('./activities');
const taskSqlResolver = require('./taskSql');

const rootResolver = {
    ...usersResolver,
    ...tasksResolver,
    ...usersTasksResolver,
    ...activitiesResolver,
    ...taskSqlResolver
}

module.exports = rootResolver;