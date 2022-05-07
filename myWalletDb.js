import { MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config()

let myWalletDb = null

try {
    const client = new MongoClient(process.env.MONGO_URI)
    client.connect()
    myWalletDb = client.db("myWallet-db")
    console.log(chalk.greenBright("Mongo atlas is now connected to this project"))
} catch (error) {
    console.log(chalk.redBright("Failure to connect to Mongo"), error)
}

export default myWalletDb