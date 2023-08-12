import { db } from "../database/database.js"

export async function selectAllToken(token) {
  return await db.query(`SELECT * FROM sessions WHERE token = $1`, [token])
}

export async function findUser(userId){
  return await db.query(`SELECT * FROM users WHERE id = $1`, [userId])
}

export async function serviceCreate(name,userId,shortDescription,longDescription,photo,city,isActive,price){
  return await db.query(`INSERT INTO services (name, "userId", "shortDescription", "longDescription", photo, city, "isActive", price ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[name,userId,shortDescription,longDescription,photo,city,isActive,price])
}

export async function selectServiceId(serviceId){
  return await db.query(`SELECT id, "isActive" FROM services WHERE services.id = $1`, [serviceId])
}

export async function serviceUpdate(serviceStatus, serviceId){
  return await db.query(`UPDATE services SET "isActive" = $1 WHERE id = $2`, [serviceStatus, serviceId])
}

export async function serviceDelete(serviceId){
  return await db.query(`DELETE FROm services WHERE id = $1`, [ serviceId])
}

export async function uServices(userId){
  return await db.query(`SELECT * FROM services WHERE services."userId" = $1`, [userId])
}