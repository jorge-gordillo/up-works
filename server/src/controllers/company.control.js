import Company from "../models/Company"

export const getData = async (req, res) => {
   const uid = req.tokenUid
	try {
		const userFound = await Company.findOne(
			{ where: { uid }}
		)
		if (!userFound) return res.status(400).json({
			error: {
				status: 404,
				msg: 'Recurso no encontrado'
			}
		})
		res.status(200).json({
			data: {
				...userFound.dataValues
			}
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'company.contoll/getData', msg: e.message })
		res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}

export const putProfile = async (req, res) => {
   const { name, birthday, country, address } = req.body
   const uid = req.tokenUid
   try {
      const count = await Company.update(
         { name, birthday, country, address },
         { where: { uid } }
      )
      if (count === 0) return res.status(400).json({
			error: {
				status: 400,
				msg: 'Error al actualizar los datos'
			}
      })
      res.status(200).json({
			data: 'Datos actualizados correctamente'
		})
   } catch (e) {
      console.log({ status: 'Error', from: 'company.contoll/putProfile', msg: e.message })
		res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
   }
}

export const putPhoto = async (req, res) => {
   const { photo } = req.body
   try {
      throw Error('Accion no soportada por el servidor')
      const count = await Regular.update(
         { photo },
         {where: { uid } }
      )
      if (count === 0) return res.status(400).json({
			error: {
				status: 400,
				msg: 'Error al actualizar la foto'
			}
      })
      return res.status(200).json({
			data: 'Foto actualizada correctamente'
		})
   } catch (e) {
      console.log({ status: 'Error', from: 'company.contoll/putPhoto', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
   }
}