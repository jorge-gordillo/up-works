import { DataTypes } from "sequelize";
import { sequelize } from "../database/database"
import Company from "./Company"

const Jobs = sequelize.define("jobs",
	{
		id_job: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		id_company: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Company,
				key: 'id_company'
			}
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		salary: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ubication: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		type: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		state: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	},
	{
		timestamps: true,
		underscored: true,
		tableName: 'jobs'
	}
)

export default Jobs