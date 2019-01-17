const { buildSchema } = require("graphql");

module.exports = buildSchema(`
        type Task {
            _id: ID!
            title: String!
            description: String
            date: String!
            deadline: String
            assigned: Boolean
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
            taskId: Task!
            userId: User!
            status: String!
            changeDate: String!
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
            userName: String!
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
            assigned: Boolean!
        }

        input UserTaskInput {
            taskId: String!
            userId: String!
            status: String!
            changeDate: String!
        }
        input UpdateUserTask {
            id: String!
            status: String!
            changeDate: String!
            userId: String!
        }
        type RootQuery {
            tasks(assigned : Boolean): [Task!]!
            userTasks(userTaskInput: UserTaskInput): [UserTask!]!
            users: [User!]!
            login(email: String!, password: String!): AuthData!
        }

        type RootMutation {
            createTask(taskInput: TaskInput): Task
            createUserTask(userTaskInput: UserTaskInput): UserTask
            updateUserTask(updateUserTask: UpdateUserTask): Boolean
            updateTask(assigned: Boolean, id: String): Boolean
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery 
            mutation: RootMutation
        }
        `);