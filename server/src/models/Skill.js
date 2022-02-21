import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

const Skills = sequelize.define("skills", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	uid: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	title: {
      type: DataTypes.TEXT,
      allowNull: false
   },
   years: {
		type: DataTypes.TEXT,
		allowNull: false
	}},
	{ timestamps: false }
)

export default Skills