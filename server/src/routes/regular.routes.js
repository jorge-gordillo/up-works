import { Router } from "express";
import { verifyToken, isRegular } from "../middlewares";
import { getData, putProfile, putContact, putTitle, postExperience, putExperience, deleteExperience, postEducation, putEducation, deleteEducation, postSkill, putSkill, deleteSkill, postIdiom, putIdiom, deleteIdiom, postLink, putLink, deleteLink, postCourse, putCourse, deleteCourse } from "../controllers/regular.control";

const router = Router();

// Obtener informacion
router.get('/', [verifyToken, isRegular], getData)

// Editar perfil
router.put("/profile", [verifyToken, isRegular], putProfile)
// Edital datos de contacto
router.put("/contact", [verifyToken, isRegular], putContact)
// Editar titulo profecional
router.put("/title", [verifyToken, isRegular], putTitle)

// Agregar, actualizar y eleiminar una experiencia
router.post("/experience", [verifyToken], postExperience)
router.put("/experience", [verifyToken], putExperience)
router.delete("/experience", [verifyToken], deleteExperience)

// Agregar, actualizar y eleiminar una educacion
router.post("/education", [verifyToken], postEducation)
router.put("/education", [verifyToken], putEducation)
router.delete("/education", [verifyToken], deleteEducation)

// Agregar, actualizar y eleiminar un skill
router.post("/skill", [verifyToken], postSkill)
router.put("/skill", [verifyToken], putSkill)
router.delete("/skill", [verifyToken], deleteSkill)

// Agregar, actualizar y eleiminar un idioma
router.post("/idiom", [verifyToken], postIdiom)
router.put("/idiom", [verifyToken], putIdiom)
router.delete("/idiom", [verifyToken], deleteIdiom)

// Agregar, actualizar y eleiminar un link
router.post("/link", [verifyToken], postLink)
router.put("/link", [verifyToken], putLink)
router.delete("/link", [verifyToken], deleteLink)

// Agregar, actualizar y eleiminar un curso o ceritificacion
router.post("/course", [verifyToken], postCourse)
router.put("/course", [verifyToken], putCourse)
router.delete("/course", [verifyToken], deleteCourse)

export default router