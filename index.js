import cors from 'cors'
import chalk from 'chalk'
import express, { json } from 'express'
import { signin, signup } from './controllers/authController.js'
import { newTransaction, getTransactions, getBalance } from './controllers/transactionController.js'
import {getUser} from './controllers/userController.js'


const app = express()
app.use(json())
app.use(cors())



app.post('/signin', signin)
app.post('/signup', signup)
app.get('/user', getUser)
app.post('/transactions', newTransaction)
app.get('/transactions', getTransactions)
app.get('/balance', getBalance)

app.listen(5000, () => {
    console.log(chalk.bold.green('Server running at port 5000'))
})
