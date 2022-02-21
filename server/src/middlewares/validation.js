export const isRegular = async (req, res, next) => {
	const role = req.role
	try {
		if (role !== 'regular') throw Error("No tienes permisos para acceder")
		next()
	} catch (e) {
		res.status(403).json({ error: { message: e.message }})
	}
}
export const isCompany = async (req, res, next) => {
	const role = req.role
	try {
		if (role !== 'company') throw Error("No tienes permisos para acceder")
		next()
	} catch (e) {
		res.status(403).json({ error: { message: e.message }})
	}
}
export const isAdmin = async (req, res, next) => {
   const role = req.role
   try {
      // if (role !== 'admin') throw Error("No tienes permisos para acceder")
		next()
   } catch (e) {
      res.status(403).json({ error: { message: e.message }})
   }
}