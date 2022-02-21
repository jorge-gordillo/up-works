import { encryptPassword } from '../middlewares'
import Admin from "../models/Admin";
import Regular from "../models/Regular";
import Company from '../models/Company'
import User from "../models/User"
import Profile from "../models/Profile"
import Contact from "../models/Contact"
import Title from "../models/Title"
import Jobs from '../models/Jobs'
import Aplication from '../models/Aplication';

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
   const uid = req.tokenId
	try {
		const userFoud = await Admin.findByPk(uid)
		res.status(200).json({
         ...userFoud.dataValues,
      })
	} catch (e) {
		return res.status(400).json({ ok: false, error: { message: e.message }})
	}
}

export const newAdmin = async (req, res) => {
   const { email, password, name } = req.body
	const role = 'admin'
	try {
		const foundUser = await User.findOne(
			{ where: { email }}
		)
		if (foundUser) throw Error('El email ya esta siendo utilizado por otra cuenta')

		const newUser = await User.create(
			{ email, password: await encryptPassword(password), role },
			{ fields: ['email', 'password', 'role'] }
		)

		await Admin.create(
			{ uid: newUser.uid, name },
			{ fields: ['uid', 'name'] }
		)
		res.status(200).json({ ok: true, message: 'Administrador creado correctamente' })
	} catch (e) {
		res.status(401).json({ ok: false, error: { message: e.message }})
	}
}
export const newRegular = async (req, res) => {
	const { matricula, email, password, name, photo, gender } = req.body
	const role = 'regular'
	try {
		const foundUser = await User.findOne(
			{ where: { email }}
		)
		if (foundUser) throw Error('El email ya esta siendo utilizado por otra cuenta')

		const newUser = await User.create(
			{ email, password: await encryptPassword(password), role },
			{ fields: ['email', 'password', 'role'] }
		)

		await Regular.create({ uid: newUser.uid, matricula },{ fields: ['uid', 'matricula'] })
		await Profile.create({ uid: newUser.uid, name, photo, gender },{ fields: ['uid', 'name', 'photo', 'gender'] })
		await Contact.create({ uid: newUser.uid }, { fields: ['uid'] })
		await Title.create({ uid: newUser.uid }, { fields: ['uid'] })

		res.status(200).json({ ok: true, message: 'Usuario creado correctamente'})
	} catch (e) {
		res.status(401).json({ ok: false, error: { message: e.message }})
	}
}
export const newCompany = async (req, res) => {
	const { email, password, name, logo } = req.body
	const role = 'company'
	try {
		const foundUser = await User.findOne(
			{ where: { email }}
		)
		if (foundUser) throw Error('El email ya esta siendo utilizado por otra cuenta')

		const newUser = await User.create(
			{ email, password: await encryptPassword(password), role},
			{ fields: [ 'email', 'password', 'role' ]}
		)
		await Company.create(
			{ uid: newUser.uid, name, logo },
			{ fields: ['uid', 'name', 'logo']}
		)
		res.status(201).json({ ok: true, message: 'Compañia creada correctamente'})
	} catch (e) {
		res.status(400).json({ ok: false, error: { message: e.message }});
	}
}

export const deleteUser = async (req, res) => {
   const { uid } = req.body
   try {
		const count = await User.destroy(
			{ where: { uid }}
		)
      if (count === 0) throw Error('Error al eliminar el usuario')
      res.json({ ok: true, message: 'Usuario eleiminado correctamente' })
   } catch (e) {
      res.json({ ok: false, error: { message: e.message }})
   }
}

export const getRegulars = async (req, res) => {
	try {
		const users = await User.findAll({
			include: [{
				model: Regular,
				attributes: { exclude: ['uid'] },
				include: [{ model: Profile, attributes: { exclude: ['uid'] } }, { model: Contact, attributes: { exclude: ['uid'] } }],
			}],
			attributes: { exclude: ['password'] },
			where: { role: 'regular' },
			order: ["uid"],
		})
		if (users) return res.json(users)
	} catch (e) {
		res.json({ error: { message: e.message }})
	}
}
export const getCompanies = async (req, res) => {
	try {
		const companies = await User.findAll({
			include: [{
				model: Company,
				attributes: { exclude: ['uid'] },
				include: [{ model: Jobs }],
			}],
			attributes: { exclude: ['password'] },
			where: { role: 'company' },
			order: ["uid"],
		})
		if (companies) return res.json(companies)
	} catch (e) {
		res.json({ error: { message: "Error al obtener los usuarios" }})
	}
}

export const consulta = async (req, res) => {
	const users = await Regular.findAll({
		include: [{
			model: Aplication,
			include: [{ model: Jobs }]
		}]
	})
	res.json(users)
}