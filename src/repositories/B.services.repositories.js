import { db } from "../database/database.js"

export async function selectAllServices() {
  return await db.query(`SELECT id, price, photo, "shortDescription", name FROM services`)
}

export async function selectService(serviceId) {
  return await db.query(`SELECT services.price, services.photo, services."shortDescription",services."longDescription", services.name, users.telephone, users.city FROM services JOIN users ON users.id = services."userId" WHERE services.id = $1`, [serviceId])
}

export async function selectAllToken(token) {
  return await db.query(`SELECT * FROM sessions WHERE token = $1`, [token])
}
