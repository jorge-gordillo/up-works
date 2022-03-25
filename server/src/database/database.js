import { Sequelize } from 'sequelize'
require('dotenv').config()

const DB_URI = process.env.DB_URI

export const sequelize = new Sequelize(DB_URI,
	{
		dialect: "postgres",
      logging: false,
		pool: {
			max: 5,
			min: 0,
			require: 30000,
			idle: 10000
		}
	}
)