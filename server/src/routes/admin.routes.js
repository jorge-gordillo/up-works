import { Router } from "express"
import { verifyToken, isAdmin } from "../middlewares"
import { getData, newAdmin, newRegular, newCompany, deleteUser, getRegulars, getCompanies, consulta } from "../controllers/admin.control"
const router = Router()

// Obtener los datos del admin
router.get('/', [verifyToken, isAdmin], getData)
router.get('/consulta', consulta)

// Registrar admin
router.post("/admin", [verifyToken, isAdmin], newAdmin)
// Registrar alumno
router.post("/regular", [verifyToken, isAdmin], newRegular)
// Registrar compañia
router.post("/company", [verifyToken, isAdmin], newCompany)

// Elimnar usuario
router.delete("/delete-user", [verifyToken, isAdmin], deleteUser)

// Obtener todos los usuarios
router.get("/regular", [verifyToken, isAdmin], getRegulars)
// Obtener todas las compañias
router.get('/company', [verifyToken, isAdmin], getCompanies)

export default router