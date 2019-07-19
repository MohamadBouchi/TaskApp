const TaskSql = require('../../models/taskSql');

module.exports = {
    taskSql: async (args, req) => {
        // if(!req.isAuth) {
        //     throw new Error('Unauthenticated');
        // }
        try {
            const taskSql = await TaskSql.find({_id: args.id});
            return taskSql.map(el => {
                return { ...el._doc, _id: el._doc._id.toString() };
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        };
    },
    createTaskSql: async (args, req) => {
        // if(!req.isAuth) {
        //     throw new Error('Unauthenticated');
        // }
        try {
            const taskSql = new TaskSql({
                sql: args.sql,
                title: args.title
            });
            await taskSql.save()
            return { ...taskSql._doc, _id: taskSql.id };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}