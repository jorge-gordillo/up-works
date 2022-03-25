import { encryptPassword } from '../helpers'
import Admin from "../models/Admin"
import Regular from "../models/Regular"
import Company from '../models/Company'
import User from "../models/User"
import Aplication from '../models/Aplication'
import Jobs from '../models/Jobs'

export const createAdmin = async () => {
	const email = 'admin@uptapachula.edu.mx'
	const password = 'admin'
	const name = 'Karina Cancino Villatoro'
	const role = 'admin'
	try {
		const foundUser = await User.findOne(
			{ where: { email }}
		)
		if (foundUser) return

		const newUser = await User.create(
			{ email, password: await encryptPassword(password), role },
			{ fields: ['email', 'password', 'role'] }
		)
		if (newUser) console.log('Usuario Creado')

		await Admin.create(
			{ uid: newUser.uid, name },
			{ fields: ['uid', 'name'] }
		)
		
		console.log(`Admin creado: \nemail: ${email} \npassword: ${password} \nInicia sesion y cambia la contraseña por defecto`)
	} catch (e) {
		console.log(e.message)
	}
}

export const getData = async (req, res) => {
   const uid = req.tokenUid
	try {
		const userFound = await Admin.findOne(
			{ where: { uid }}
		)
		if (!userFound) return res.status(404).json({
			error: {
				satatus: 404,
				msg: "Usuario no econtrado"
			}
		})
		res.status(200).json({
			status: 200,
			msg: 'OK',
			data: {
				...userFound.dataValues
			}
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'admin.contoll/getData', msg: e.message })
		res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}

export const newAdmin = async (req, res) => {
	const { email, password, name } = req.body
	const role = 'admin'
	try {
		const newUser = await User.create(
			{ email, password: await encryptPassword(password), role },
			{ fields: ['email', 'password', 'role'] }
		)
		await Admin.create(
			{ uid: newUser.uid, name },
			{ fields: ['uid', 'name'] }
		)
		delete newUser.dataValues.password
		res.status(200).json({
			data: {
				...newUser.dataValues
			}
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'admin.contoll/newAdmin', msg: e.message })
		res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}
export const newRegular = async (req, res) => {
	const { matricula, email, password, name } = req.body
	const role = 'regular'
	try {
		const newUser = await User.create(
			{ email, password: await encryptPassword(password), role },
			{ fields: ['email', 'password', 'role'] }
		)
		await Regular.create(
			{ uid: newUser.uid, matricula, name },
			{ fields: ['uid', 'matricula', 'name'] }
		)
		delete newUser.dataValues.password
		res.status(200).json({
			data: {
				...newUser.dataValues
			}
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'admin.contoll/newRegular', msg: e.message })
		res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}
export const newCompany = async (req, res) => {
	const { email, password, name } = req.body
	const role = 'company'
	try {
		const newUser = await User.create(
			{ email, password: await encryptPassword(password), role},
			{ fields: [ 'email', 'password', 'role' ]}
		)
		await Company.create(
			{ uid: newUser.uid, name },
			{ fields: ['uid', 'name' ]}
		)
		delete newUser.dataValues.password
		res.status(200).json({
			data: {
				...newUser.dataValues
			}
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'admin.contoll/newCompany', msg: e.message })
		res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}

export const getRegulars = async (req, res) => {
	try {
		const users = await User.findAll({
			include: [{
				model: Regular,
				include: [{ model: Aplication }],
			}],
			attributes: { exclude: ['password'] },
			where: { role: 'regular' },
			order: ["uid"],
		})
		res.json({
			data: users
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'admin.contoll/getRegulars', msg: e.message })
		res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}
export const getCompanies = async (req, res) => {
	try {
		const companies = await User.findAll({
			include: [{
				model: Company,
				include: [{ model: Jobs }],
			}],
			attributes: { exclude: ['password'] },
			where: { role: 'company' },
			order: ["uid"],
		})
		res.json({
			data: companies
		})
	} catch (e) {
		console.log({ status: 'Error', from: 'admin.contoll/getConpanies', msg: e.message })
		res.status(500).json({
			error: {
				status: 500,
				msg: 'Error interno del servidor'
			}
		})
	}
}
