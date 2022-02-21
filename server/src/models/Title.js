import { DataTypes } from "sequelize"
import { sequelize } from '../database/database'

const Title = sequelize.define(
	"titles",
	{
		uid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		title: {
			type: DataTypes.TEXT,
		},
		abstract: {
			type: DataTypes.TEXT,
		}
	},
	{
		timestamps: false,
	}
);

export default Title