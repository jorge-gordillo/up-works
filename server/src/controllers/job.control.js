import Company from '../models/Company'
import Jobs from '../models/Jobs'

export const postJob = async (req, res) => {
	const { id_company, title, salary, ubication, type, description } = req.body
	try {
		const job = await Jobs.create(
			{ id_company, title, salary, ubication, type, description },
			{ fields: ['id_company', 'title', 'salary', 'ubication', 'type', 'description'] }
		)
		if (!job) return res.status(400).json({
			error: {
				status: 400,
				msg: 'Error al crear la vacante'
			}
		})
      res.status(200).json({
			data: job
      })
   } catch (e) {
      console.log({ status: 'Error', from: 'job.contoll/postJob', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
   }
}

export const getJobs = async (req, res) => {
	const state = 0
	try {
		const jobs = await Jobs.findAll({
			where: { state },
			include: { model: Company, as: 'company', attributes: ['name', 'logo'] },
			order: [
				['createdAt', 'DESC']
			]
		})
		if (!jobs) return res.status(400).json({
			error: {
				status: 500,
				msg: 'Error al obtener las vacantes'
			}
		})
      res.status(200).json({
			data: jobs
      })
   } catch (e) {
      console.log({ status: 'Error', from: 'job.contoll/getJobs', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
   }
}

export const getJobsByCompany = async (req, res) => {
	const { id_company } = req.params 
	try {
		const jobs = await Jobs.findAll({
			where: { id_company },
		})
		if (!jobs) return res.status(400).json({
			error: {
				status:400,
				msg: 'Error al obtenr las vacantes'
			}
		})
      res.status(200).json({
			data: jobs
      })
   } catch (e) {
      console.log({ status: 'Error', from: 'job.contoll/getJobsByCompany', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
   }
}

export const getJobById = async (req, res) => {
	const { id_job } = req.params
	try {
		const job = await Jobs.findByPk(id_job)

		if (!job) return res.status(404).json({
			error: {
				status: 404,
				msg: 'Recurso no encontrado'
			}
		})
      res.status(200).json({
			data: job
      })
   } catch (e) {
      console.log({ status: 'Error', from: 'job.contoll/getJobById', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
   }
}

export const putJob = async (req, res) => {
	const { id_job } = req.params
	const { title, salary, ubication, type, description, state } = req.body
	try {
		const put = await Jobs.update(
			{ title, salary, ubication, type, description, state },
			{ where: { id_job } }
		)
		
		if (put === 0) return res.status(400).json({
			error: {
				status: 400,
				msg: 'Error al actualizar los datos'
			}
		})
      res.status(200).json({
			data: 'Vacante actualizada correctamente'
      })
   } catch (e) {
      console.log({ status: 'Error', from: 'job.contoll/putJob', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
   }
}
