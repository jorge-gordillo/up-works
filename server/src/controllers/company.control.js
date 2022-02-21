import Company from "../models/Company"
import Jobs from "../models/Jobs"

export const getData = async (req, res) => {
   const uid = req.tokenId
	try {
      const userFoud = await Company.findByPk(uid,
         { incluide: [{ model: Jobs }]}
      )
		res.status(200).json({
         ...userFoud.dataValues,
      })
	} catch (e) {
		return res.status(400).json({ ok: false, error: { message: e.message }})
	}
}

export const getAplications = (req, res) => {
   const {  } = req.body
   try {
      
   } catch (e) {
      return res.status(400).json({ ok: false, error: { message: e.message }})
   }
}

export const getJobs = (req, res) => {
	const {  } = req.body
   try {
      
   } catch (e) {
      return res.status(400).json({ ok: false, error: { message: e.message }})
   }
}

export const getJobById = (req, res) => {
	const {  } = req.body
   try {
      
   } catch (e) {
      return res.status(400).json({ ok: false, error: { message: e.message }})
   }
}

export const postJob = (req, res) => {
   const {  } = req.body
   try {
      
   } catch (e) {
      return res.status(400).json({ ok: false, error: { message: e.message }})
   }
}

export const uptadeJob = (req, res) => {
   const {  } = req.body
   try {
      
   } catch (e) {
      return res.status(400).json({ ok: false, error: { message: e.message }})
   }
}

export const deleteJob = (req, res) => {
   const {  } = req.body
   try {
      
   } catch (e) {
      return res.status(400).json({ ok: false, error: { message: e.message }})
   }
}