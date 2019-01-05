const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Task = require('./models/tasks');
const UserTask = require('./models/userTask');

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

        type UserTask {
            _id: ID!
            taskId: String
            userId: String
            status: String!
            changeDate: String!
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
        }
        schema {
            query: RootQuery 
            mutation: RootMutation
        }
        `),
    rootValue: {
        // tasks: () => {
        //     return tasks
        // },
        // userTask: () => {
        //     return userTask
        // },
        createTask: (args) => {
            console.log(args)
            const task = new Task({
                title: args.taskInput.title,
                description: args.taskInput.description,
                date: new Date(args.taskInput.date),
                deadline: new Date(args.taskInput.deadline)
            });
            return task.save()
                .then(result => {
                    console.log(result);
                    return { ...result._doc };
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },
        createUserTask: (args) => {
            console.log(args.userTaskInput);
            const userTask = new UserTask({
                taskId: args.userTaskInput.taskId,
                userId: args.userTaskInput.userId,
                status: args.userTaskInput.status,
                changeDate: new Date (args.userTaskInput.changeDate)
            });
            return userTask.save()
                .then(result => {
                    console.log(result);
                    return {...result._doc};
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