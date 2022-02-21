import Regular from "../models/Regular"
import Experience from "../models/Experience"
import Education from "../models/Education"
import Skill from '../models/Skill';
import Idiom from "../models/Idiom"
import Link from '../models/Link';
import Course from '../models/Course';
import Aplication from '../models/Aplication';
import Profile from '../models/Profile';
import Contact from '../models/Contact';
import Title from '../models/Title';

//* Login de usuario regular
export const getData = async (req, res) => {
   const uid = req.tokenId
	try {
      const userFoud = await Regular.findByPk(uid,
         { include: [{ model: Profile }, { model: Contact }, { model: Title }, { model: Experience }, { model: Education}, {model: Skill}, { model: Idiom}, {model: Link}, {model:Course}, {model: Aplication }]}
      )
		res.status(200).json({
         ...userFoud.dataValues,
      })
	} catch (e) {
		return res.status(400).json({ ok: false, error: { code: 400, message: e.message }})
	}
}

export const putProfile = async (req, res) => {
   const { name, gender, birthday, country, state, city, postalCode, relocate } = req.body
   const uid = req.tokenId
   try {
      const count = await Profile.update(
         { name, gender, birthday, country, state, city, postalCode, relocate },
         { where: { uid }})
      if (count === 0) throw Error('Error al actualizar los datos')
      res.status(200).json({ok: true, message: 'Datos actializados correctamente'})
   } catch (e) {
      return res.status(400).json({ ok: false, error: { code: 400, message: e.message }})
   }
}
export const putContact = async (req, res) => {
   const { phone, extra_email, extra_phone } = req.body
   const uid = req.tokenId
   try {
      const count = await Contact.update(
         { phone, extra_email, extra_phone },
         { where: { uid }}
      )
      if (count === 0) throw Error('Error al actualizar los datos')
      res.status(200).json({ok: true, message: 'Datos actializados correctamente'})
   } catch (e) {
      return res.status(400).json({ ok: false, error: { code: 400, message: e.message }})
   }
}
export const putTitle = async (req, res) => {
   const { title, abstract } = req.body
   const uid = req.tokenId
   try {
      const count = await Title.update(
         { title, abstract },
         { where: { uid }}
      )
      if (count === 0) throw Error('Error al actualizar los datos')
      res.status(200).json({ok: true, message: 'Datos actializados correctamente'})
   } catch (e) {
      return res.status(200).json({ ok: true, error: { code: 400, message: e.message}})
   }
}

export const postExperience = async (req, res) => {
   const { title, company, activities, start, working, finish } = req.body
   const uid = req.tokenId
	try {
		const newExperience = await Experience.create(
			{ uid, title, company, activities, start, working, finish },
         { fields: [ 'uid', 'title', 'company', 'activities', 'start', 'working', 'finish' ]}
		)
      if (!newExperience) throw Error('Erro al crear el elemento')

      res.status(200).json({ ok: true, message: 'Datos actializados correctamente' })
	} catch (e) {
      res.status(401).json({ ok: false, error: { code: 400, message: e.message }})
	}
}
export const putExperience = async (req, res) => {
   const { id, title, company, activities, start, working, finish } = req.body
   try {
      const count = await Experience.update(
         { title, company, activities, start, working, finish },
         { where: { id } }
      )
      if (count === 0) throw Error('Error al actualizar los datos')

      res.status(200).json({ ok: true, message: 'Datos actializados correctamente' })
   } catch (e) {
      return res.status(400).json({ ok: false, error: { code: 400, message: e.message}})
   }
}
export const deleteExperience = async (req, res) => {
   const { id } = req.body
   try {
      const deleteRowCount = await Experience.destroy(
         { where: { id }}
      )
		if (deleteRowCount === 0) throw Error('Erro al eliminar el elemento')
		res.json({ message: "Elemento eliminado correctamente" })
   } catch (e) {
      return res.status(200).json({ ok: false, error: { code: 400, message: e.message}})
   }
}

export const postEducation = async (req, res) => {
   const { level, institution, title, start, studying, finish } = req.body
   const uid = req.tokenId
   try {
      const newEducation = await Education.create(
         { uid, level, institution, title, start, studying, finish },
         { fields: [ 'uid', 'level', 'institution', 'title', 'start', 'studying', 'finish']}
      )
      if (!newEducation) throw Error('Error al crear el elemento')

      res.status(200).json({ ok: true, message: 'Datos actializados correctamente' })
   } catch (e) {
      res.status(401).json({ message: e.message })
   }
}
export const putEducation = async (req, res) => {
   const { id, level, institution, title, start, studying, finish } = req.body
   try {
      const count = await Education.update(
         { level, institution, title, start, studying, finish },
         { where: { id }}
      )
      if (count === 0) throw Error('Errro al actualizar los datos')

      res.status(200).json({ ok: true, message: 'Datos actualizados correctamente' })
   } catch (e) {
      res.status(401).json({ ok: false, error: { code: 400, message: e.message}})
   }
}
export const deleteEducation = async (req, res) => {
   const { id } = req.body
   try {
      const deleteRowCount = await Education.destroy(
         { where: { id }}
      )
      if (deleteRowCount === 0) throw Error('Erro al eliminar el elemento')
		res.json({ ok: true, message: "Elemento eliminado correctamente" })
   } catch (e) {
      res.status(401).json({ ok: false, error: { code: 400, message: e.message}})
   }
}

export const postSkill = async (req, res) => {
   const { title, years } = req.body
   const uid = req.tokenId
   try {
      const newSkill = await Skill.create(
         { uid, title, years },
         { fields: [ 'uid', 'title', 'years' ]}
      )
      if (!newSkill) throw Error('Error al crear el elemento')

      res.status(200).json({ ok: true, message: 'Datos actializados correctamente' })
   } catch (e) {
      res.status(401).json({ message: e.message })
   }
}
export const putSkill = async (req, res) => {
   const { id, title, years } = req.body
   try {
      const count = await Skill.update(
         { title, years },
         { where: { id }}
      )
      if (count === 0) throw Error('Errro al actualizar los datos')

      res.status(200).json({ ok: true, message: 'Datos actualizados correctamente' })
   } catch (e) {
      res.status(401).json({ ok: false, error: { code: 400, message: e.message}})
   }
}
export const deleteSkill = async (req, res) => {
   const { id } = req.body
   try {
      const deleteRowCount = await Skill.destroy(
         { where: { id }}
      )
      if (deleteRowCount === 0) throw Error('Erro al eliminar el elemento')
		res.json({ ok: true, message: "Elemento eliminado correctamente" })
   } catch (e) {
      res.status(401).json({ ok: false, error: { code: 400, message: e.message}})
   }
}

export const postIdiom = async (req, res) => {
   const { title, level } = req.body
   const uid = req.tokenId
   try {
      const newIdiom = await Idiom.create(
         { uid, title, level },
         { fields: [ 'uid', 'title', 'level' ]}
      )
      if (!newIdiom) throw Error('Error al crear el elemento')

      res.status(200).json({ ok: true, message: 'Datos actializados correctamente' })
   } catch (e) {
      res.status(401).json({ message: e.message })
   }
}
export const putIdiom = async (req, res) => {
   const { id, title, level } = req.body
   try {
      const count = await Idiom.update(
         { title, level },
         { where: { id }}
      )
      if (count === 0) throw Error('Errro al actualizar los datos')

      res.status(200).json({ ok: true, message: 'Datos actualizados correctamente' })
   } catch (e) {
      res.status(401).json({ ok: false, error: { code: 400, message: e.message}})
   }
}
export const deleteIdiom = async (req, res) => {
   const { id } = req.body
   try {
      const deleteRowCount = await Idiom.destroy(
         { where: { id }}
      )
      if (deleteRowCount === 0) throw Error('Erro al eliminar el elemento')
		res.json({ ok: true, message: "Elemento eliminado correctamente" })
   } catch (e) {
      res.status(401).json({ ok: false, error: { code: 400, message: e.message}})
   }
}

export const postLink = async (req, res) => {
   const { link } = req.body
   const uid = req.tokenId
   try {
      const newLink = await Link.create(
         { uid, link },
         { fields: [ 'uid', 'link' ]}
      )
      if (!newLink) throw Error('Error al crear el elemento')

      res.status(200).json({ ok: true, message: 'Datos actializados correctamente' })
   } catch (e) {
      res.status(401).json({ message: e.message })
   }
}
export const putLink = async (req, res) => {
   const { id, link } = req.body
   try {
      const count = await Link.update(
         { link },
         { where: { id }}
      )
      if (count === 0) throw Error('Errro al actualizar los datos')

      res.status(200).json({ ok: true, message: 'Datos actualizados correctamente' })
   } catch (e) {
      res.status(401).json({ ok: false, error: { code: 400, message: e.message}})
   }
}
export const deleteLink = async (req, res) => {
   const { id } = req.body
   try {
      const deleteRowCount = await Link.destroy(
         { where: { id }}
      )
      if (deleteRowCount === 0) throw Error('Erro al eliminar el elemento')
		res.json({ ok: true, message: "Elemento eliminado correctamente" })
   } catch (e) {
      res.status(401).json({ ok: false, error: { code: 400, message: e.message}})
   }
}

export const postCourse = async (req, res) => {
   const { title, description } = req.body
   const uid = req.tokenId
   try {
      const newCouerse = await Course.create(
         { uid, title, description },
         { fields: [ 'uid', 'tile', 'description' ]}
      )
      if (!newCouerse) throw Error('Error al crear el elemento')

      res.status(200).json({ ok: true, message: 'Datos actializados correctamente' })
   } catch (e) {
      res.status(401).json({ message: e.message })
   }
}
export const putCourse = async (req, res) => {
   const { id, title, description } = req.body
   try {
      const count = await Course.update(
         { title, description },
         { where: { id }}
      )
      if (count === 0) throw Error('Error al actualizar los datos')

      res.status(200).json({ ok: true, message: 'Datos actualizados correctamente' })
   } catch (e) {
      res.status(401).json({ ok: false, error: { code: 400, message: e.message}})
   }
}
export const deleteCourse = async (req, res) => {
   const { id } = req.body
   try {
      const deleteRowCount = await Course.destroy(
         { where: { id }}
      )
      if (deleteRowCount === 0) throw Error('Error al eliminar el elemento')
		res.json({ ok: true, message: "Elemento eliminado correctamente" })
   } catch (e) {
      res.status(401).json({ ok: false, error: { code: 400, message: e.message}})
   }
}

export const applyJob = async (req, rea) => {

}
export const cancelApplication = async (req, res) => {

}
