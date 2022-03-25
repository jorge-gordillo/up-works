import '@babel/polyfill'
require('dotenv').config()
import express, { json, urlencoded } from 'express'
import { createAdmin } from './controllers/admin.control'
import cors from 'cors'
import morgan from 'morgan'
import pkg from '../package.json'

var corsOptions = {
	origin: 'http:localhost:3000',
}

//* Importing routes
import usersRoutes from './routes/users.routes'
import regularRoutes from './routes/regular.routes'
import adminRoutes from './routes/admin.routes'
import companyRoutes from './routes/company.routes'
import jobRoutes from './routes/jobs..routes'
import apllicationRoutes from './routes/application.routes.js'

//* Initialization
const app = express()

//* Middlewares
app.set("pkg", pkg)
app.use(cors())
app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({ extended: true }))

//* Ruta raiz
app.get('/', (req, res) => {
   res.json({
      name: app.get("pkg").name,
		author: app.get("pkg").author,
		description: app.get("pkg").description,
		verson: app.get("pkg").version,
	})
})

//* Routes
app.use("/api/v1/auth", usersRoutes)
app.use("/api/v1/admins", adminRoutes)
app.use("/api/v1/regulars", regularRoutes)
app.use("/api/v1/companies", companyRoutes)
app.use("/api/v1/jobs", jobRoutes)
app.use("/api/v1/applications", apllicationRoutes)
createAdmin()

export default app