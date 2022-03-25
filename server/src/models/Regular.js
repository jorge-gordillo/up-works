import { DataTypes } from "sequelize"
import { sequelize } from '../database/database'
import User from "./User"

const Regular = sequelize.define("regulars",
	{
		id_regular: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		uid: {
			type: DataTypes.INTEGER,
			unique: true,
			references: {
				model: User,
				key: 'uid'
			}
		},
		matricula: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		photo: DataTypes.TEXT,
		personal_email: DataTypes.TEXT,
		birthday: DataTypes.DATE,
		phone: DataTypes.TEXT,
		ocupation: DataTypes.TEXT,
		abstract: DataTypes.TEXT,
		relocate: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		cv: DataTypes.TEXT,
		createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
	},
	{
		timestamps: true,
		underscored: true,
		tableName: 'regulars',
	}
)

User.hasOne(Regular, { foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade' })
Regular.belongsTo(User, { foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade' })

export default Regular