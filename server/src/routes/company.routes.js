import { Router } from "express"
import { verifyToken, isCompany } from '../middlewares'
import { getData, getAplications, getJobs, getJobById, postJob, uptadeJob, deleteJob } from "../controllers/company.control"

const router = Router()

router.get("/", [verifyToken, isCompany], getData)

router.get("/applications", [verifyToken, isCompany], getAplications)

router.get("/jobs", [verifyToken, isCompany], getJobs)
router.get("/job", [verifyToken, isCompany], getJobById)

router.post("/job", [verifyToken, isCompany], postJob)
router.put("/job", [verifyToken, isCompany], uptadeJob)
router.delete("/job", [verifyToken, isCompany], deleteJob)

export default router