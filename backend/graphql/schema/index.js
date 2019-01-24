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

        type Activity {
            _id: ID!
            taskTitle: String!
            userName: String
            date: String!
            status: String!
            changeDate: String!
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
        input UpdateUserPassword {
            id: String!
            password: String!
        }
        input CreateActivityInput {
            userName: String!
            taskTitle: String!
            status: String!
            changeDate: String!
            date: String!
        }

        type RootQuery {
            tasks(assigned : Boolean): [Task!]!
            userTasks(userTaskInput: UserTaskInput): [UserTask!]!
            users: [User!]!
            login(email: String!, password: String!): AuthData!
            activity(date: String!): [Activity]
            taskDetail(id: String!): [UserTask!]!
        }

        type RootMutation {
            createTask(taskInput: TaskInput): Task
            createUserTask(userTaskInput: UserTaskInput): UserTask
            updateUserTask(updateUserTask: UpdateUserTask): Boolean
            updateUserPassword(updateUserPassword: UpdateUserPassword): Boolean
            updateTask(assigned: Boolean, id: String): Boolean
            createUser(userInput: UserInput): User
            createActivity(createActivityInput: CreateActivityInput): Boolean
        }
        schema {
            query: RootQuery 
            mutation: RootMutation
        }
        `);