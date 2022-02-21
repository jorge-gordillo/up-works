import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import Jobs from "./Jobs";

const Aplication = sequelize.define("applications", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	id_job: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	uid: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
   state: {
      type: DataTypes.TEXT,
      defaultValue: 'postulado'
   }},
	{ timestamps: false }
)

Aplication.hasOne(Jobs, {foreignKey:'id_job', sourceKey:'id_job', onDelete: 'cascade' })
Jobs.belongsTo(Aplication, {foreignKey:'id_job', sourceKey:'id_job', onDelete: 'cascade' })


export default Aplication