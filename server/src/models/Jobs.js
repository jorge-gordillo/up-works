import { DataTypes } from "sequelize";
import { sequelize } from "../database/database"
import Aplication from "./Aplication"
import Regular from "./Regular";

const Jobs = sequelize.define("jobs", {
   id_job: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	uid: {
      type: DataTypes.INTEGER,
      allowNull: false
	},
	active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
	},
	title: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	ubication: {
		type: DataTypes.TEXT,
		allowNull: false
   },
	vacancies: {
		type: DataTypes.INTEGER,
		allowNull: false
   },
	job_type: {
		type: DataTypes.TEXT,
		allowNull: false
   },
	start_salary: {
		type: DataTypes.INTEGER,
		allowNull: false
   },
	end_salary: {
		type: DataTypes.INTEGER,
		allowNull: true
   },
   salary_type: {
		type: DataTypes.TEXT,
		allowNull: false
   },
   company_logo: {
		type: DataTypes.TEXT,
		allowNull: false
   },
   company_name: {
		type: DataTypes.TEXT,
		allowNull: false
   },

},
	{ timestamps: false }
)



export default Jobs