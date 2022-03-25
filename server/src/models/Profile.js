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
		personal_email: {
			type: DataTypes.TEXT,
		},
		birthday: {
			type: DataTypes.DATE,
		},
		phone: {
			type: DataTypes.TEXT,
		},
		ocupation: {
			type: DataTypes.TEXT,
		},
		abstract: {
			type: DataTypes.TEXT
		},
		relocate: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		cv: {
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: false,
		underscored: true,
		tableName: 'profiles',
		freezeTableName: false,
	}
);

export default Profile