import { v4 as uuid } from 'uuid';
import myWalletDb from '../myWalletDb.js';
import bcrypt from 'bcrypt'
import joi from 'joi'
import chalk from 'chalk';

const emailPattern = /[a-z0-9.]+@[a-z0-9]+\.[a-z]/
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
const userSchema = joi.object(
    {
        name: joi.string().min(1).required(), 
        email: joi.string().pattern(emailPattern).required(),
        password: joi.string().pattern(passwordPattern).required()

    }
)

export async function signin(req, res) {
    const { email, password } = req.body
    try {
        const user = await myWalletDb.collection("users").findOne({ email })

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid()
    
            await myWalletDb.collection("sessions").insertOne({
                userId: user._id,
                token
            })
    
            return res.send(token);
        } else {
            // usuário não encontrado (email ou senha incorretos)
            return res.status(404).send("Usuário não encontrado")
            
        }   
    } catch (error) {
        res.status(400).send(error)
    }

}

export async function signup(req,res){

    /*
    Validar body da requisição
    Verificar se o usuário já possui cadastro 
    Cadastrar usuário
    */

    const user = req.body
    const validation = userSchema.validate(user)
    if(validation.error) return res.status(422).send(validation.error.details.map(detail => detail.message))

    try {
        const isUserSignedUp = await myWalletDb.collection("users").findOne({email: user.email})
        if (isUserSignedUp) return res.sendStatus(409)
        await myWalletDb.collection("users").insertOne(
            {
                name: user.name,
                email: user.email,
                password: bcrypt.hashSync(user.password, 10)
            }
        )
        res.sendStatus(200)
    } catch (error) {
        console.log("Usuário não foi inserido no banco.", chalk.red(error))
    }
}

