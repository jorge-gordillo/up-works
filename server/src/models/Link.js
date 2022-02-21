import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

const Link = sequelize.define("links", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	uid: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	link: {
      type: DataTypes.TEXT,
      allowNull: false
   }},
	{ timestamps: false }
)

export default Link