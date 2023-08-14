const express = require("express")
const swaggerUI = require('swagger-ui-express')

const app = express()
const cors = require("cors")

// DB connections:
require("./configs/database")

// Middleware
app.use(express.json())
app.use(cors())

//swagger
const swaggerDocument = require('./openapi.json');

//
const authController = require("./Controllers/authController")
const authdigits = require("./Controllers/authdigits")

const MoviesRouter = require("./Routers/MoviesRouter")
const UsersRouter = require("./Routers/UsersRouter")
const MembersRouter = require("./Routers/MembersRouter")
const SubscriptionsRouter = require("./Routers/SubscriptionsRouter")

//endpoints
app.use('/api/Auth', authController) //localhost:8000/api/auth/login
app.use('/api/Auth', authdigits) // localhost:8000/api/auth/sendGenerateToken/:Email , // localhost:8000/api/auth/verify/:token

app.use("/api/Users", UsersRouter) // localhost:8000/api/Users
app.use("/api/Movies", MoviesRouter) // localhost:8000/api/Movies
app.use("/api/Members", MembersRouter) // localhost:8000/api/Members
app.use("/api/Subscriptions", SubscriptionsRouter) // localhost:8000/api/Subscriptions

app.use('/api/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));// localhost:8000/api/api-docs

// Start the server 
const port = 8000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})