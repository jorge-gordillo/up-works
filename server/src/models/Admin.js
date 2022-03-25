import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import User from "./User"

const Admin = sequelize.define("admins", 
	{
		id_admin: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		uid: {
			type: DataTypes.INTEGER,
			unique: true,
			references: {
				model: User,
				key: 'uid'
			}
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
	},
	{
		timestamps: true,
		underscored: true,
		tableName: 'admins'
	}
)

User.hasOne(Admin, { foreignKey: 'uid', sourceKey: 'uid', onDelete: 'cascade' })
Admin.belongsTo(User, { foreignKey: 'uid', sourceKey: 'uid', onDelete: 'cascade' })

export default Admin