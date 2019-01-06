const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Task = require('./models/tasks');
const UserTask = require('./models/userTask');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

const app = express();

app.use(bodyParser.json());
app.use('/graphql', graphQlHttp({
    schema: buildSchema(`
        type Task {
            _id: ID!
            title: String!
            description: String
            date: String!
            deadline: String
        }

        type User {
            _id: ID!
            email: String!
            password: String
            userName: String!
            firstName: String!
        }

        type UserTask {
            _id: ID!
            taskId: String
            userId: String
            status: String!
            changeDate: String!
        }

        input UserInput {
            email: String!
            password: String!
            userName: String
            firstName: String!
            lastName: String!
        }

        input TaskInput {
            title: String!
            description: String!
            date: String!
            deadline: String!
        }

        input UserTaskInput {
            taskId: String!
            userId: String!
            status: String!
            changeDate: String!
        }
        type RootQuery {
            tasks: [Task!]!
            userTasks: [UserTask!]!
        }

        type RootMutation {
            createTask(taskInput: TaskInput): Task
            createUserTask(userTaskInput: UserTaskInput): UserTask
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery 
            mutation: RootMutation
        }
        `),
    rootValue: {
        tasks: () => {
            return Task.find()
                .then(tasks => {
                    return tasks.map(task => {
                        return {...task._doc, _id: task._doc._id.toString()};
                    });
                })
                .catch(err => {
                    console.log(err);
                    throw err;   
                });
        },
        userTasks: () => {
            return UserTask.find()
                .then(userTasks => {
                    return userTasks.map(userTask => {
                        return {...userTask._doc, _id: userTask.id };
                    });
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },
        createTask: (args) => {
            console.log(args)
            const task = new Task({
                title: args.taskInput.title,
                description: args.taskInput.description,
                date: new Date(args.taskInput.date),
                deadline: new Date(args.taskInput.deadline)
            });
            return task.save()
                .then(task => {
                    return { ...task._doc, _id: task.id };
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },
        createUserTask: (args) => {
            const userTask = new UserTask({
                // taskId: args.userTaskInput.taskId,
                taskId: '5c31414bc33c2902d0987ade',
                userId: '5c313f29e28ffa02bc016019',
                // userId: args.userTaskInput.userId,
                status: args.userTaskInput.status,
                changeDate: new Date (args.userTaskInput.changeDate)
            });
            return userTask.save()
                .then(userTask => {
                    return { ...userTask._doc, _id:userTask.id };
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },
        createUser: (args) => {
            return User.findOne({email: args.userInput.email})
                .then(user => {
                    if(user){
                        throw new Error('User exist')
                    }
                    return bcrypt.hash(args.userInput.password, 12);
                })
                .then(hashedPassword => {
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPassword,
                        userName: args.userInput.userName,
                        firstName: args.userInput.firstName,
                        lastName: args.userInput.lastName,
                    });
                    return user.save();
                })
                .then(user => {
                    return {...user._doc, _id: user.id, password: null};
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        }
    },
    graphiql: true
})
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-autbo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });