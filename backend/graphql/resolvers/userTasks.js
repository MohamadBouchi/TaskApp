const UserTask = require('../../models/userTask');
const { dateToString } = require('../../helpers/date');

module.exports = {
    userTasks: async (args) => {
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
    createUserTask: async (args) => {
        try {
            const userTask = new UserTask({
                taskId: args.userTaskInput.taskId,
                userId: args.userTaskInput.userId,
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
    updateUserTask: (args) => {
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