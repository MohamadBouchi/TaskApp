const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    users: async (req) => {
        // if(!req.isAuth) {
        //     throw new Error('Unauthenticated');
        // }
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
    createUser: async (args, req) => {
        // if(!req.isAuth) {
        //     throw new Error('Unauthenticated');
        // }
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
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        if(!user) {
            throw new Error('User does not exist');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            throw new Error('Password is incorrect');
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 'secretkey', {expiresIn: '1h'});
        return {userId: user.id, token: token, tokenExpiration: 1, userName: user.userName};
    }
}