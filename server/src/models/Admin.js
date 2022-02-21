import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import User from "./User"

const Admin = sequelize.define("admins", {
	uid: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	name: {
		type: DataTypes.TEXT,
		allowNull: false
	}},
	{ timestamps: false }
)

User.hasOne(Admin, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade' })
Admin.belongsTo(User, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade' })

export default Admin