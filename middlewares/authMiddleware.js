import chalk from "chalk"
import myWalletDb from "../myWalletDb.js"

export async function validateToken(req,res, next){
    
    /*
    Obter o token do header 
    Verificar a existência do token do usuário no banco de dados
    Obter usuário
    Next 
    */

    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if(!token) return res.status(409).send("Token não foi enviado")

    
    try {
        const session = await myWalletDb.collection("sessions").findOne({token})
        if (!session) return res.status(404).send('Token não encontrado')

    const user = await myWalletDb.collection("users").findOne({_id: session.userId })
    if (!user) return res.status(404).send("Usuário não encontrado")

    res.locals.user = user  
    
    next()

    } catch (error) {
        console.log(chalk.red(error))
    }

}