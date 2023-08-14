import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import * as R from "../repositories/auth.repositories.js"

export async function signUp(req,res){
  const {name, email, password, confirmPassword, telephone, city, photo, userType} = req.body

  try{
    const checkEmail = await R.selectAllUsersEmail(email)
    if (checkEmail.rowCount !== 0) return res.status(409).send("Email indisponível para uso!")

    const checkPhone = await R.selectAllUsersTelephone(telephone)

    if (checkPhone.rowCount !== 0) return res.status(409).send("Numero de telefone indisponível para uso!")

    if(confirmPassword !== password) return res.status(422).send("A senha e a confirmação de senha devem ser iguais!");
    const cryptedPassword = bcrypt.hashSync(password, 10);

    await R.insertIntoUsers(name, cryptedPassword, email, telephone, city, photo, userType)
    res.status(201).send({message:"Usuário cadastrado com sucesso! :)"})
  }catch (err){
    console.log(err)
  }
}

export async function signIn(req,res){
  const {email, password} = req.body
  try{
    const checkUser = await R.selectAllUsersEmail(email)
    if (checkUser.rowCount === 0 ||!(await bcrypt.compare(password, checkUser.rows[0].password))) return res.status(401).send({message:"Email ou senha incorretos! Verifique seus dados novamente"})

    const userId = checkUser.rows[0].id
    const token = uuid();

    await R.insertIntoSessions(userId, token);

    res.status(200).send({message:`Seja bem vindo(a), ${checkUser.rows[0].name}`, token, user:checkUser.rows[0]})
  }catch (err){
    console.log(err)
  }
}
