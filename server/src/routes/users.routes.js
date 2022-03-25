import { Router } from "express"
import { verifyToken } from '../middlewares'
import { login, resetPassword, forgotPassword, newPassword } from "../controllers/users.control"

const router = Router()

router.post('/login', login)
router.put('/reset', [verifyToken], resetPassword)

//TODO: Realizar la recuperacion de contraseña por email
router.post('/forgot-password', forgotPassword)
router.put('/new-password', newPassword)

export default router
