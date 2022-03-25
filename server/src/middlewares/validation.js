import User from "../models/User"

export const isRegular = (req, res, next) => {
	const role = req.tokenRole
	try {
		if (role !== 'regular') {
			return res.status(403).json({
				error: {
					status: 403,
					msg: 'No autorizado! Se requiere role Regular'
				}
			})
		}
		next()
	} catch (e) {
		console.log({ status: 'Error', from: 'validation/isRegular', msg: e.message })
		res.status(500).json({
			error: {
				status: 500,
				msg: 'El servidor no responde'
			}
		})
	}
}
export const isCompany = (req, res, next) => {
	const role = req.tokenRole
	try {
		if (role !== 'company') {
			return res.status(403).json({
				error: {
					status: 403,
					msg: 'No autorizado! Se requiere role Company'
				}
			})
		}
		next()
	} catch (e) {
		console.log({ status: 'Error', from: 'validation/isCompany', msg: e.message })
		res.status(500).json({
			error: {
				status: 500,
				msg: 'El servidor no responde'
			}
		})
	}
}
export const isAdmin = (req, res, next) => {
   const role = req.tokenRole
	try {
		if (role !== 'admin') {
			return res.status(403).json({
				error: {
					status: 403,
					msg: 'No autorizado! Se requiere role Admin'
				}
			})
		}
		next()
	} catch (e) {
		console.log({ status: 'Error', from: 'validation/isAdmin', msg: e.message })
		res.status(500).json({
			error: {
				status: 500,
				msg: 'El servidor no responde'
			}
		})
	}
}

export const checkDuplicateEmail = async (req, res, next) => {
	const email = req.body.email
	try {
		const userFound = await User.findOne(
			{ where: { email }}
		)
		if (userFound) {
			return res.status(400).send({
				error: {
					status: 400,
					msg: '¡Ha fallado! El email ya esta en uso'
				}
			})
		}
		next()
	} catch (e) {
		console.log({ status: 'Error', from: 'validation/checkDuplicateEmail', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'El servidor no responde'
			}
		})
	}
}