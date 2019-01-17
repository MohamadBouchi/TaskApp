const Task = require('../../models/tasks');
const { dateToString } = require('../../helpers/date');

module.exports = {
    tasks: async (args, req) => {
        // if(!req.isAuth) {
        //     throw new Error('Unauthenticated');
        // }
        try {
            const tasks = await Task.find({assigned: args.assigned});
            return tasks.map(task => {
                return { ...task._doc, _id: task._doc._id.toString(), date: dateToString(task._doc.date), deadline: dateToString(task._doc.deadline) };
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        };
    },
    createTask: async (args, req) => {
        // if(!req.isAuth) {
        //     throw new Error('Unauthenticated');
        // }
        try {
            const task = new Task({
                title: args.taskInput.title,
                description: args.taskInput.description,
                assigned: args.taskInput.assigned,
                date: new Date(args.taskInput.date),
                deadline: new Date(args.taskInput.deadline)
            });
            await task.save()
            return { ...task._doc, _id: task.id, date: dateToString(task._doc.date), deadline: dateToString(task._doc.deadline) };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    updateTask: async (args, req) => {
        // if(!req.isAuth) {
        //     throw new Error('Unauthenticated');
        // }
        const updated = Task.updateOne({ _id: args.id }, {
            assigned: args.assigned
        }, function (err, affected, resp) {
            if (affected.nModified === 1)
                return true;
            else
                return false;
        });
        if (updated)
            return true;
        else
            return false;
    }
}