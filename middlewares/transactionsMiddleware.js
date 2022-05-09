import transactionSchema from "../schemas/transactionSchema.js";

export function validateTransaction(req, res, next){
    const transaction = req.body

    const validation = transactionSchema.validate(transaction)
    if (validation.error) return res.status(422).send(validation.error.details.map(detail => detail.message))

    next()
}