import Regular from "../models/Regular"

//* Login de usuario regular
export const getData = async (req, res) => {
   const uid = req.tokenUid
	try {
      const userFound = await Regular.findOne(
         { where: { uid }}
      )
      if (!userFound) return res.status(400).json({
			error: {
				status: 400,
				msg: 'Error al obtener el recurso'
			}
      })
      return res.status(200).json({
			data: {
				...userFound.dataValues
			}
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'regular.contoll/getData', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}

export const putProfile = async (req, res) => {
   const { name, personal_email, birthday, phone, ocupation, abstract, relocate } = req.body
   const uid = req.tokenUid
   try {
      const count = await Regular.update(
         { name, personal_email, birthday, phone, ocupation, abstract, relocate },
         { where: { uid } }
      )
      if (count === 0) return res.status(400).json({
			error: {
				status: 400,
				msg: 'Error al actualizar los datos'
			}
      })
      return res.status(200).json({
			data: 'Datos actualizados correctamente'
		})
   } catch (e) {
      console.log({ status: 'Error', from: 'regular.contoll/putProfile', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
   }
}

// TODO: Realizar la subida de la foto de perfil
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
      console.log({ status: 'Error', from: 'regular.contoll/putPhoto', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
   }
}