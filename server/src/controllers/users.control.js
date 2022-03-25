import jwt from 'jsonwebtoken'
import User from "../models/User"
import { comparePassword, encryptPassword } from "../helpers"

const JWT_SECRET = process.env.JWT_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN

export const login = async (req, res) => {
	const { email, password } = req.body
	try {
		const userFound = await User.findOne(
			{ where: { email }}
		)
		const matchPassword = await comparePassword( password, userFound.password )
		if (!userFound || !matchPassword) {
			return res.status(400).json({
				error: {
					status: 400,
					msg: 'Correo o contraseña incorrectos'
				}
			})
		}
      //* Token access creation
		const token = jwt.sign({ id: userFound.uid, role: userFound.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN })
      //* Refresh token creation
		const refreshToken = jwt.sign({ id: userFound.uid, role: userFound.role }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN })

		delete userFound.dataValues.password
		res.status(200).json({
			data: {
				...userFound.dataValues,
				registered: true,
				token,
				refreshToken,
				expires_in: (TOKEN_EXPIRES_IN / 1000 / 60 ),
				expires_at: new Date(new Date().getTime() + parseInt(TOKEN_EXPIRES_IN))
			}
      })
	} catch (e) {
		console.log({ status: 'Error', from: 'user.contoll/login', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}

export const resetPassword = async (req, res) => {
	const uid = req.tokenUid
	const { password, newPassword } = req.body
	try {
		const userFoud = await User.findByPk(uid,
			{ attributes: ['password'] }
		)

		const matchPassword = await comparePassword(password, userFoud.password)
		if (!matchPassword) {
			res.status(400).json({
				error: {
					status: 400,
					msg: 'Contraseña actual incorrecta'
				}
			})
		}

		const put = await User.update(
			{ password: await encryptPassword(newPassword) },
         { where: { uid }}
		)
		if (put === 0) return res.state(400).json({
			error: {
				status: 400,
				msg: 'Error al actualizar los datos'
			}
		})
		return res.status(200).json({
			data: 'Contraseña actualizada correctamente'
		})
   } catch (e) {
      console.log({ status: 'Error', from: 'user.contoll/changedPassword', msg: e.message })
		return res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
   }
}

export const changeUserStatus = async (req, res) => {
	const uid = req.tokenUid
	const { state } = req.body
	try {
		const put = await User.update(
			{ state },
			{ where: uid }
		)
		if (put === 0) return res.state(400).json({
			error: {
				status: 400,
				msg: 'Error al actualizar los datos'
			}
		})
		
		res.status(200).json({
			data: 'Usuario actualizado correctamente'
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

//TODO: Realizar la recuperacion de contraseña por email
export const forgotPassword = async (req, res) => {}
export const newPassword = async (req, res) => {}