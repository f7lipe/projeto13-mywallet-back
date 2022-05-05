import { v4 as uuid } from 'uuid';
import myWalletDb from '../db';
import bcrypt from 'bcrypt'


export async function signin(req, res) {
    const { email, password } = req.body

    const user = await myWalletDb.collection("users").findeOne({ email })

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();


        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        })

        res.send(token);
    } else {
        // usuário não encontrado (email ou senha incorretos)
        res.status(404).send("Usuário não encontrado")
    }   
}