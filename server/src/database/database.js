import Sequelize from 'sequelize'

const database = "upworks"
const user = "postgres"
const password = "jorge503" //Introduce la contraseña de la base de datos
const host = "localhost"
const port = "5432"

export const sequelize = new Sequelize(
	database,
	user,
	password, 
	{
      host,
      port,
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