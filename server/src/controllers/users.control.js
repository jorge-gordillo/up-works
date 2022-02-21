import jwt from 'jsonwebtoken'
import config from '../config';
import { comparePassword, encryptPassword } from "../middlewares"
import User from "../models/User"

export const login = async (req, res) => {
   const { email, password } = req.body
	try {
		const userFoud = await User.findOne(
			{ where: { email }}
		)
		if (!userFoud) throw Error("Correo invalido")

		const matchPassword = await comparePassword( password, userFoud.password )
      if (!matchPassword) throw Error("Contraseña invalida")
      
		const token = jwt.sign(
			{ id: userFoud.uid, role: userFoud.role },
			config.SECRET,
			{ expiresIn: config.expiresIn }
		)

      delete userFoud.dataValues.password
		res.status(200).json({
			ok: true,
         ...userFoud.dataValues,
			registered: true,
			token,
         exexpiresIn: config.expiresIn,
      })
	} catch (e) {
		return res.status(400).json({ ok: false, error: { code: 400, message: e.message }})
	}
}

export const changePassword = async (req, res) => {
	const { uid, password, newPassword } = req.body
	try {
		const userFoud = await User.findByPk(uid_a,
			{ attributes: ['password'] }
		)

		const matchPassword = await comparePassword(password, userFoud.password)
      if (!matchPassword) throw Error("Contraseña actual invalida")

      const repitPassword = await comparePassword(newPassword, userFoud.password)
      if (repitPassword) throw Error("No existe diferencias entre la contraseña antigua y la actual")

		const put = await User.update(
			{ password: await encryptPassword(newPassword) },
         { where: { uid }}
		)
		if (put === 0) throw Error('Ocurrio un problema al actualizar la contraseña')

		res.status(200).json({ ok: true, message: "Contraseña actualizada correctamente" })
   } catch (e) {
      return res.status(400).json({ error: { code: 400, message: e.message } })
   }
}

export const forgotPassword = async (req, res) => { }

export const newPassword = async (req, res) => { }