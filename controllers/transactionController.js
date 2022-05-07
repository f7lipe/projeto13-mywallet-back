import joi from "joi";

const transactionSchema = joi.object(
    {
        type: joi.string().valid('input', 'output').required(),
        description: joi.string().min(1).required(), 
        date: joi.date().required(), 
        amount: joi.number().required()
    }
)