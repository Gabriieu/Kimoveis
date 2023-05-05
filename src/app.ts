import "reflect-metadata"
import "express-async-errors"
import express, { Application } from "express"
import { handleErrors } from "./error"
import { usersRoutes } from "./routes/users.route"
import { loginRoute } from "./routes/login.route"
import { categoryRoutes } from "./routes/category.route"


const app: Application = express()
app.use(express.json())

app.use('/users', usersRoutes)
app.use('/login', loginRoute)
app.use('/categories', categoryRoutes)

app.use(handleErrors)

export default app