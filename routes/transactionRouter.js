import { Router } from "express"
import { validateTransaction } from "../middlewares/transactionsMiddleware.js"
import { validateToken } from "../middlewares/authMiddleware.js"
import { newTransaction, getTransactions, getBalance } from "../controllers/transactionController.js"

const transactionRouter = Router()
transactionRouter.post('/transactions', validateToken, validateTransaction, newTransaction)
transactionRouter.get('/transactions', validateToken, getTransactions)
transactionRouter.get('/balance', validateToken, getBalance)

export default transactionRouter