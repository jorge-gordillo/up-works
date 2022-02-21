import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

const Experience = sequelize.define("experiences", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	uid: {
		type: DataTypes.INTEGER,
		allowNull: false,
		foreignKey: true
	},
	title: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	company: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	activities: {
		type: DataTypes.TEXT
	},
	start: {
		type: DataTypes.DATE,
		allowNull: false
	},
	working: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	},
	finish: {
		type: DataTypes.DATE
	}},
	{ timestamps: false }
)

export default Experience