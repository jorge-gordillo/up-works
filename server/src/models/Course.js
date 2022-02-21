import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

const Course = sequelize.define("courses", {
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
   description: {
      type: DataTypes.TEXT
   }},
	{ timestamps: false }
)

export default Course