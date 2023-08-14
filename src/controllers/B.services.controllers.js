import * as R from "../repositories/B.services.repositories.js"

export async function getService(req,res) {
  const {id:serviceId} = req.params
  try{
    const service = await R.selectService(serviceId)
    if (service.rowCount === 0 ) return res.status(404).send({message: "Serviço não cadastrado"})
    res.status(200).send(service.rows[0])
  }catch(err){
    console.log(err)
    res.sendStatus(500);
  }
}

export async function getServices(req,res) {
  try{
    const services = await R.selectAllServices()
    const orderedServices = services.rows.reverse()
    res.status(200).send(orderedServices)
  }catch(err){
    console.log(err)
    res.sendStatus(500);
  }
}