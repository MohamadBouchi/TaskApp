const express = require('express')
const bodyParser = require('body-parser')
const graphQlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('')

const app = express()

app.use(bodyParser.json())
app.use('/graphql', graphQlHttp({
    schema: buildSchema(`
        type RootQuery {
            tasks: [String!]!
            userTasks: [String!]!

        }
        type RootMutation {
            createTask(title: String): String
            createUserTask(status: String): String
        }

        schema {
            query: RootQuery 
            mutation: RootMutation
        }
        `),
    rootValue: {
        tasks: () => {
            return ['test1', 'test2']
        },
        createTask: (args) => {
            const taskTitle = args.title;
            return taskTitle;
        }
    },
    graphiql: true
    })
)

app.listen(3000)