import jwt from 'jsonwebtoken'
import config from '../config'

export const verifyToken = async (req, res, next) => {
   const token = req.headers["x-access-token"]
   
   if (!token) return res.status(403).json({ error: { message: "Usuario no Autenticado" }})

   jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) return catchError(err, res)
      req.tokenId = decoded.id
      req.role = decoded.role
      next()
   })
}

export const catchError = (err, res) => {
   const { TokenExpiredError } = jwt
   if (err instanceof TokenExpiredError) {
      return res.status(401).send({
         message: 'No autorizado! El token ha expirado'
      })
   }
   return res.status(401).send({
      message: 'No autorizado'
   })
}