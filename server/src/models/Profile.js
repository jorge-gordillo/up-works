import { DataTypes } from "sequelize"
import { sequelize } from '../database/database'

const Profile = sequelize.define(
	"profiles",
	{
		uid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		photo: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		gender: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		birthday: {
			type: DataTypes.DATE,
		},
		country: {
			type: DataTypes.TEXT,
		},
		state: {
			type: DataTypes.TEXT,
		},
		city: {
			type: DataTypes.TEXT,
		},
		cp: {
			type: DataTypes.TEXT,
		},
		relocate: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		}
	},
	{
		timestamps: false,
		underscored: true,
		tableName: 'profiles',
		freezeTableName: false,
	}
);

export default Profile