import * as R from "../repositories/S.services.repositories.js"

export async function createService(req,res) {
  const {name, userId, shortDescription, longDescription, photo, city, isActive, price} = req.body
  const token = req.headers.authorization.replace("Bearer ", "")

  try{
    const checkUserToken = await R.selectAllToken(token)
    const checkUserId = await R.findUser(userId)

    if (checkUserToken.rowCount === 0) return res.sendStatus(401)

    if (checkUserToken.rows[0].userId !== userId) return res.status(404).send({message:"Não é possível cadastrar o novo serviço"})

    if(checkUserId.rowCount === 0) return res.status(404).send({message:"ID de usuário não encontrado"})

    await R.serviceCreate(name,userId,shortDescription,longDescription,photo,city,isActive,price)
    res.status(201).send({message:"Serviço cadastrado com sucesso :)"})

  }catch(err){
    console.log(err)
    res.sendStatus(500);
  }
}

export async function updateService(req,res) {
  const {id:serviceId} = req.params

  try{
    const checkService = await R.selectServiceId(serviceId)
    if(checkService.rowCount === 0) return res.status(404).send({message:"Serviço não encontrado!"})
    const serviceStatus = !checkService.rows[0].isActive
    R.serviceUpdate(serviceStatus, serviceId)
    res.status(204).send({message: "Status atualizado com sucesso"})
  }catch(err){
    console.log(err)
    res.sendStatus(500);
  }
}

export async function myServices (req,res){
  const {id:userId} = req.params
  try{
    const checkUser = await R.findUser(userId)
    if(checkUser.rowCount === 0) return res.status(404).send({message:"Usuario não encontrado"})
    const userServices = await R.uServices(userId)
    res.status(200).send(userServices.rows)
  } catch (err){
    console.log(err)
    res.sendStatus(500);
  }
}

export async function deleteService(req,res) {
  const {id:serviceId} = req.params
  try{
    const checkService = await R.selectServiceId(serviceId)
    if(checkService.rowCount === 0) return res.status(404).send({message:"Serviço não encontrado!"})

    await R.serviceDelete(serviceId)
    
    res.status(202).send({message:"Serviço excluído"})
  }catch(err){
    console.log(err)
    res.sendStatus(500);
  }
}