const usersResolver = require('./users');
const tasksResolver = require('./tasks');
const usersTasksResolver = require('./userTasks');

const rootResolver = {
    ...usersResolver,
    ...tasksResolver,
    ...usersTasksResolver
}

module.exports = rootResolver;