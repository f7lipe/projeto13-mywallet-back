import joi from "joi";

const emailPattern = /[a-z0-9.]+@[a-z0-9]+\.[a-z]/
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

const authSchema = joi.object(
    {
        name: joi.string().min(1).required(), 
        email: joi.string().pattern(emailPattern).required(),
        password: joi.string().pattern(passwordPattern).required()

    }
)


export default authSchema
