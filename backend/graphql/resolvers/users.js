const User = require('../../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
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