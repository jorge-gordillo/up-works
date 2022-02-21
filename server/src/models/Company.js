import { DataTypes } from "sequelize"
import { sequelize } from "../database/database"
import User from "./User"
import Jobs from './Jobs'

const Company = sequelize.define(
	"companies",
	{
		uid: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		logo: {
			type: DataTypes.TEXT,
		},
		description: {
			type: DataTypes.TEXT
		},
		web: {
			type: DataTypes.TEXT
		},
		sector: {
			type: DataTypes.TEXT
		},
		size: {
			type: DataTypes.TEXT
		},
		sede: {
			type: DataTypes.TEXT
		},
		type: {
			type: DataTypes.TEXT
		},
		ceo_name: {
			type: DataTypes.TEXT
		},
		cp: {
			type: DataTypes.TEXT
		},
		phone: {
			type: DataTypes.TEXT
		}
   },
   { timestamps: false }
)

User.hasOne(Company, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade' })
Company.belongsTo(User, { foreignKey: 'uid', sourceKey: 'uid', onDelete: 'cascade' })

Company.hasOne(Jobs, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade' })
Jobs.belongsTo(Company, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade' })

export default Company
