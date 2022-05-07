import joi from "joi";
import { ObjectId } from "mongodb";
import myWalletDb from "../myWalletDb.js";

const transactionSchema = joi.object(
    {
        type: joi.string().valid('input', 'output').required(),
        description: joi.string().min(1).required(), 
        date: joi.date().required(), 
        amount: joi.number().required()
    }
)

export async function newTransaction(req, res){

    /*
    Validar o header da requisição 
    Validar body da requisição
    Verificar a existência do token do usuário no banco de dados
    Cadastrar nova transação 
    */

    const transaction = req.body
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    const validation = transactionSchema.validate(transaction)
    if (validation.error) return res.status(422).send(validation.error.details.map(detail => detail.message))

    try {
        const isExistingToken = await myWalletDb.collection("sessions").findOne({token})
        const {userId} = isExistingToken
        console.log(isExistingToken)
        if (isExistingToken){
            await myWalletDb.collection("transactions").insertOne(
                {
                    type: transaction.type,
                    description: transaction.description, 
                    date: transaction.date, 
                    amount: transaction.amount, 
                    ownerID: new ObjectId(userId)
                }
            )
            res.sendStatus(200)
        } else return res.status(404).send("Token não encontrado")
    } catch (error) {
        res.status(400).send(error)
    }
}