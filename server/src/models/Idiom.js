import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

const Idiom = sequelize.define("idioms", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	uid: {
		type: DataTypes.INTEGER,
		allowNull: false,
		
	},
	title: {
      type: DataTypes.TEXT,
      allowNull: false
   },
   level: {
		type: DataTypes.TEXT,
		allowNull: false
	}},
	{ timestamps: false }
)

export default Idiom