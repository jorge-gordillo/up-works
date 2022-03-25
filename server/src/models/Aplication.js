import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import Jobs from "./Jobs";
import Regular from "./Regular";

const Aplication = sequelize.define("applications",
	{
		id_appli: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		id_job: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Jobs,
				key: 'id_job'
			}
		},
		id_regular: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Regular,
				key: 'id_regular'
			}
		},
		state: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		message: DataTypes.TEXT,
		interview_date: DataTypes.DATE,
		interview_time: DataTypes.TIME,
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	},
	{
		timestamps: true,
		underscored: true,
		tableName: 'applications'
	}
)

Aplication.hasMany(Jobs, { foreignKey:'id_job', sourceKey:'id_job', onDelete: 'cascade' })
Jobs.belongsTo(Aplication, { foreignKey:'id_job', sourceKey:'id_job', onDelete: 'cascade' })

Aplication.hasMany(Regular, { foreignKey: 'id_regular', sourceKey: 'id_regular', onDelete: 'cascade' })
Regular.belongsTo(Aplication, { foreignKey: 'id_regular', sourceKey: 'id_regular', onDelete: 'cascade' })

export default Aplication