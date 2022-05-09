import myWalletDb from "../myWalletDb.js";
import dayjs from "dayjs";



export async function newTransaction(req, res){

    /*
    Cadastrar nova transação 
    */

    const transaction = req.body
    const user = res.locals.user
    try {
        const userId = user._id
        await myWalletDb.collection("transactions").insertOne(
            {
                type: transaction.type,
                description: transaction.description, 
                date: dayjs().format("DD/MM"), 
                amount: transaction.amount, 
                ownerID: userId.toString()
            }
        )
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error)
    }
}

export async function getTransactions(req, res){

    /*
    Obter ID do usuário 
    Buscar transações do usuário
    Enviar transações para o front
    */

    const {user} = res.locals

    try {
        const userId = user._id
        const transactions = await myWalletDb.collection("transactions").find({ownerID: userId.toString()}).toArray()
        return res.send(transactions)
    } catch (error) {
        res.status(400).send(error)
    }
}

export async function getBalance(req, res){

    /*
    Obter transações do usuário
    Calcular saldo
    Retornar saldo para o usuário
    */

    const {user} = res.locals

    try {
        const userId = user._id
        const transactions = await myWalletDb.collection("transactions").find({ownerID: userId.toString()}).toArray()
        const amounts = []
        let balance = 0 
        transactions.forEach(transaction => {
            if(transaction.type === 'input') amounts.push(Number(transaction.amount))
            else amounts.push(Number(transaction.amount) * -1)
        })
        for (let amount of amounts) balance += amount
        return res.send({balance: balance})
    } catch (error) {
        res.status(400).send(error)
    }

}