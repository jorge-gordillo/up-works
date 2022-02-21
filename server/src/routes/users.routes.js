import { Router } from "express"
import { verifyToken } from '../middlewares'
import { login, changePassword, forgotPassword, newPassword } from "../controllers/users.control"

const router = Router()

router.post('/login', login)
router.put('/change-password', [verifyToken], changePassword)

//TODO: Realizar la recuperacion de contraseña por email
router.post('/forgot-password', forgotPassword)
router.put('/new-password', newPassword)

export default router
