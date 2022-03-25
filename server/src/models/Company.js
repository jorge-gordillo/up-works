import { DataTypes } from "sequelize"
import { sequelize } from "../database/database"
import User from "./User"
import Jobs from './Jobs'

const Company = sequelize.define("companies",
	{
		id_company: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
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
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		logo: DataTypes.TEXT,
		birthday: DataTypes.DATE,
		country: DataTypes.TEXT,
		address: DataTypes.TEXT,
		createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
	},
	{
		timestamps: true,
		underscored: true,
		tableName: 'companies'
	}
)

User.hasOne(Company, { foreignKey: 'uid', sourceKey: 'uid', onDelete: 'cascade' })
Company.belongsTo(User, { foreignKey: 'uid', sourceKey: 'uid', onDelete: 'cascade' })

Jobs.hasMany(Company, { foreignKey:'id_company', sourceKey:'id_company', onDelete: 'cascade', as: 'company' })
Company.belongsTo(Jobs, { foreignKey:'id_company', sourceKey:'id_company', onDelete: 'cascade' })

export default Company
