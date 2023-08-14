import { db } from "../database/database.js"

export async function selectAllUsersEmail(email) {
  return await db.query(`SELECT * FROM users WHERE email = $1`, [email])
}

export async function selectAllUsersTelephone(phone) {
  return await db.query(`SELECT * FROM users WHERE telephone = $1`, [phone])
}

export async function insertIntoUsers(name, cryptedPassword, email, telephone, city, photo, userType){
  return await db.query(`INSERT INTO users (name, password, email, telephone, city, photo, "userType") VALUES ($1, $2, $3, $4, $5, $6, $7)`, [name, cryptedPassword, email, telephone, city, photo, userType])
}

export async function insertIntoSessions(userId, token) {
  return await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [userId, token])
}