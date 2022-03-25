import { Router } from "express"
import { verifyToken, isCompany } from '../middlewares'
import { getData,  putProfile, putPhoto } from "../controllers/company.control"

const router = Router()

router.get("/",
   [verifyToken, isCompany],
   getData
)

router.put("/",
   [verifyToken, isCompany],
   putProfile
)
router.put("/photo",
   [verifyToken, isCompany],
   putPhoto
)

export default router