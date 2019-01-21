const usersResolver = require('./users');
const tasksResolver = require('./tasks');
const usersTasksResolver = require('./userTasks');
const activitiesResolver = require('./activities');

const rootResolver = {
    ...usersResolver,
    ...tasksResolver,
    ...usersTasksResolver,
    ...activitiesResolver
}

module.exports = rootResolver;