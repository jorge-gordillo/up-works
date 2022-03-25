import bcrypt from 'bcryptjs'

// Metodo para encriptar la contraseña
export const encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}
// Metodo para comparar contraseñas
export const comparePassword = async (password, compare) => {
	return await bcrypt.compare(password, compare)
}
