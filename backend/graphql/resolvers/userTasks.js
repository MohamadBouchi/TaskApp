const UserTask = require('../../models/userTask');
const { dateToString } = require('../../helpers/date');

module.exports = {
    userTasks: async (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const userTasks = await UserTask.find({ status: args.userTaskInput.status })
                .populate('taskId')
                .populate('userId');
            return userTasks.map(userTask => {
                return { ...userTask._doc, _id: userTask.id, changeDate: dateToString(userTask._doc.changeDate) };
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    createUserTask: async (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const userTask = new UserTask({
                taskId: args.userTaskInput.taskId,
                userId: args.userTaskInput.userId, // req.userId
                status: args.userTaskInput.status,
                changeDate: new Date(args.userTaskInput.changeDate)
            });
            await userTask.save();
            return { ...userTask._doc, _id: userTask.id, changeDate: dateToString(userTask._doc.changeDate) };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    updateUserTask: (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const updated = UserTask.updateOne({ _id: args.updateUserTask.id }, {
            status: args.updateUserTask.status,
            changeDate: args.updateUserTask.changeDate
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