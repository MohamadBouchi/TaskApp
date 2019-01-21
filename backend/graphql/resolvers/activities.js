const Activity = require('../../models/activties');
const { dateToString } = require('../../helpers/date');

module.exports = {
    activity: async (args) => {
        try {
            const activities = await Activity.find({date: args.date});
            return activities.map(activity => {
                return { ...activity._doc,
                         _id: activity._doc._id.toString(),
                         changeDate: dateToString(activity._doc.changeDate) };
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        };
    },
    createActivity: async (args) => {
        try {
            const activity = new Activity({
                userName: args.createActivityInput.userName,
                taskTitle: args.createActivityInput.taskTitle,
                changeDate: args.createActivityInput.changeDate,
                date: args.createActivityInput.date,
                status: args.createActivityInput.status
            });
            await activity.save()
            return true;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}