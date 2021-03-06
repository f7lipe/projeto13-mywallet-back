import cors from 'cors'
import chalk from 'chalk'
import express, { json } from 'express'
import router from './routes/index.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(json())
app.use(cors())
app.use(router)


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(chalk.bold.green('Server running at port ' + port))
})
