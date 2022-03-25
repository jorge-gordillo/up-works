import Aplication from "../models/Aplication"

export const newApplication = async (req, res) => {
	const uid = req.tokenUid
	const { id_job } = req.body
	try {
		const newApplication = await Aplication.create(
			{ uid, id_job },
			{ fields: ['uid', 'id_job' ]}
		)
		if (!newApplication) return res.status(400).json({
			error: {
				status: 400,
				msg: 'Error al crear la postulación'
			}
		})
		res.status(200).json({
			data: 'Postulado correctamente'
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'application.contoll/newApplication', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}

export const putApplication = async (req, res) => {
   const { id_appli, state, message, interview_date, interview_time } = req.body
	try {
		const put = await Aplication.update(
			{ state, message, interview_date, interview_time },
			{ whre: id_appli }
		)
		if (!put) return res.state(400).json({
			error: {
				status: 400,
				msg: 'Error al actualizar la postulación'
			}
		})
		res.status(200).json({
			data: 'Actualizado correctamente'
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'application.contoll/putApplication', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}

export const getApplicationById = async (req, res) => {
   const { id_appli } = req.params
	try {
		const application = await Aplication.findByPk(id_appli)
		if (!application) return res.status(404).json({
			error: {
				status: 404,
				msg: 'Recurso no econtrado'
			}
		})
		res.status(200).json({
			data: application
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'application.contoll/getData', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}

export const getApplicationsByUid = async (req, res) => {
   const uid = req.tokenUid
	try {
		res.status(200).json({
			data: ''
		})
			
	} catch (e) {
		console.log({ status: 'Error', from: 'application.contoll/getData', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}

export const getApplicationByCompany = async (req, res) => {
   const uid = req.tokenUid
	try {
		res.status(200).json({
			data: ''
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'application.contoll/getData', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}