import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

const Education = sequelize.define("educations", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	uid: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	level: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	institution: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	title: {
      type: DataTypes.TEXT,
      allowNull: false
	},
	start: {
		type: DataTypes.DATE,
		allowNull: false
	},
	studying: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	},
	finish: {
		type: DataTypes.DATE
	}},
	{ timestamps: false }
)

export default Education