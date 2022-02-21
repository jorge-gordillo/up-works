import { DataTypes } from "sequelize"
import { sequelize } from "../database/database"

const User = sequelize.define("users", {
	uid: {
		type: DataTypes.INTEGER,
		primaryKey: true
   },
   email: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true
	},
   password: {
      type: DataTypes.TEXT,
      allowNull: false
   },
	role: {
		type: DataTypes.TEXT,
   }
   },
	{ timestamps: false }
)

export default User