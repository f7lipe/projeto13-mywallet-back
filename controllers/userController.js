import myWalletDb from '../myWalletDb.js';
import chalk from 'chalk';

export async function getUser(req, res){

    /*
    Validar body da requisição
    Verificar se o token existe no banco de dados
    Obter id do usuário
    Retornar nome do usuário
    */

    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if(!token) return res.status(409).send("Token não foi enviado")
    

   try {
    const isExistingToken = await myWalletDb.collection("sessions").findOne({token})
    const {userId} = isExistingToken
    
    if (isExistingToken){
       const user = await myWalletDb.collection("users").findOne({_id: userId})
       return res.send({userName: user.name})
    }
} catch (error) {
    console.log("Usuário não foi inserido no banco.", chalk.red(error))
}
}
