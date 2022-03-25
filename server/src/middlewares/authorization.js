import jwt, { TokenExpiredError } from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET

export const verifyToken = async (req, res, next) => {
   const token = req.body.token || req.params.token || req.query.token || req.headers['x-access-token']

   try {
      if (!token) return res.status(401).json({
         error: {
            status: 401,
            msg: 'Usuario no autenticado'
         }
      })

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
         if (err) {
            if (err instanceof TokenExpiredError) {
               return res.status(403).send({
                  error: {
                     status: 403,
                     msg: 'No autorizado! El token ha expirado'
                  }
               })
            } else {
               return res.status(400).send({
                  error: {
                     status: 400,
                     msg: 'Error! El token es invalido'
                  }
               })
            }
         }
         req.tokenUid = decoded.id
         req.tokenRole = decoded.role
         next()
      })
   } catch (err) {
      console.log({ status: 'Error', from: 'authorization/verifyToken', msg: e.message})
      return res.status(500).send({
         error: {
            status: 500,
			   msg: 'Error interno del servidor'
         }
      })
   }
}