const Task = require('../../models/tasks');
const UserTask = require('../../models/userTask');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    tasks: async () => {
        try {
            const tasks = await Task.find();
            return tasks.map(task => {
                return { ...task._doc, _id: task._doc._id.toString(), date: new Date(task._doc.date).toISOString(), deadline: new Date(task._doc.deadline).toISOString() };
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        };
    },
    users: async () => {
        try {
            const users = await User.find();
            return users.map(user => {
                return { ...user._doc, _id: user._doc._id.toString() };
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    userTasks: async (args) => {
        try {
            const userTasks = await UserTask.find({ status: args.userTaskInput.status })
                .populate('taskId')
                .populate('userId')
            return userTasks.map(userTask => {
                return { ...userTask._doc, _id: userTask.id, changeDate: new Date(userTask._doc.changeDate).toISOString() };
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    createTask: async (args) => {
        try {
            const task = new Task({
                title: args.taskInput.title,
                description: args.taskInput.description,
                date: new Date(args.taskInput.date),
                deadline: new Date(args.taskInput.deadline)
            });
            await task.save()
            return { ...task._doc, _id: task.id, date: new Date(task._doc.date).toISOString(), deadline: new Date(task._doc.deadline).toISOString() };
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
            return { ...userTask._doc, _id: userTask.id, changeDate: new Date(userTask._doc.changeDate).toISOString() };
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
    },
    createUser: async (args) => {
        try{
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
                throw new Error('User exist')
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
                userName: args.userInput.userName,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
            });
            const createdUser = await user.save();
            return { ...createdUser._doc, _id: createdUser.id, password: null };
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}