import { DataTypes } from "sequelize"
import { sequelize } from '../database/database'

const Contact = sequelize.define(
	"contacts",
	{
		uid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		phone: {
			type: DataTypes.TEXT,
		},
      extra_phone: {
         type: DataTypes.TEXT,
      },
		extra_email: {
			type: DataTypes.TEXT,
		}
	},
	{
		timestamps: false,
	}
);

export default Contact