import { Router } from "express"
import { verifyToken, isRegular } from "../middlewares"
import { getData, putProfile, putPhoto } from "../controllers/regular.control"

const router = Router()

// Obtener informacion
router.get('/',
   [verifyToken, isRegular],
   getData
)

// Editar perfil
router.put("/",
   [verifyToken, isRegular],
   putProfile
)

// Cambiar foto de perfil
router.put('/photo',
   [verifyToken, isRegular],
   putPhoto
)

export default router