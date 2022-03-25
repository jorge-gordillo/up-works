import { DataTypes } from "sequelize"
import { sequelize } from "../database/database"

const User = sequelize.define('users',
	{
		uid: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			comment: 'Identificador de usuario'
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
			comment: 'Correo de usuario'
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: 'Contraseña de usuario'
		},
		role: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: 'Permiso del usuario'
		},
		state: {
			type: DataTypes.INTEGER,
			default: 0,
			comment: 'Estado actual del usuario'
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	},
	{
		timestamps: true,
		underscored: true,
		tableName: 'users'
	}
)

export default User