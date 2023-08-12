import { selectAllToken } from "../repositories/B.services.repositories.js"

export  function checkToken() {
  return async(req, res, next) => {
    const token = req.headers.authorization.replace("Bearer ", "")

    const checkUser = await selectAllToken(token)
    if (checkUser.rowCount === 0) return res.sendStatus(401)

    next()
  }
}