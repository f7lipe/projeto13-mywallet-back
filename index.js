import cors from 'cors'
import chalk from 'chalk'
import express, { json } from 'express'
import { signin, signup } from './controllers/authController.js'



const app = express()
app.use(cors())
app.use(json())


app.post('/signin', signin)
app.post('/signup', signup)


app.listen(5000, () => {
    console.log(chalk.bold.green('Server running at port 5000'))
})