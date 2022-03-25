import { Router } from "express"
import { verifyToken, isCompany } from "../middlewares"
import { postJob, getJobs, getJobsByCompany, getJobById, putJob } from '../controllers/job.control'

const router = Router()

router.post('/',
   [verifyToken, isCompany],
   postJob
)

router.put('/:id_job',
   [verifyToken],
   putJob
)

router.get('/:id_job',
   [verifyToken],
   getJobById
)

router.get('/',
   [verifyToken],
   getJobs
)

router.get('/company/:id_company',
   [verifyToken],
   getJobsByCompany
)




export default router