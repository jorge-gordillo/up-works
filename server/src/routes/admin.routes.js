import { Router } from "express"
import { verifyToken, isAdmin, checkDuplicateEmail } from "../middlewares"
import { getData, newAdmin, newRegular, newCompany, getRegulars, getCompanies } from "../controllers/admin.control"
const router = Router()

// Obtener los datos del admin
router.get('/',
   [verifyToken, isAdmin],
   getData
)

// Registrar admin
router.post("/admin",
   [verifyToken, isAdmin],
   newAdmin
)
// Registrar alumno
router.post("/regular",
   [verifyToken, isAdmin, checkDuplicateEmail],
   newRegular
)
// Registrar compañia
router.post("/company",
   [verifyToken, isAdmin],
   newCompany
)

// Obtener todos los usuarios
router.get("/regular",
   [verifyToken, isAdmin],
   getRegulars
)
// Obtener todas las compañias
router.get('/company',
   [verifyToken, isAdmin],
   getCompanies
)

export default router