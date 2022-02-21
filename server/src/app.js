import '@babel/polyfill'
import { createAdmin } from './controllers/admin.control'
import express, { json } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import pkg from '../package.json'

var corsOptions = {
	origin: 'http:localhost:3000',
	optionsSuccessStatus: 200
}

//* Importing routes
import usersRoutes from './routes/users.routes'
import regularRoutes from './routes/regular.routes'
import adminRoutes from './routes/admin.routes'
import companyRoutes from './routes/company.routes'

//* Initialization
const app = express()

//* Middlewares
app.set("pkg", pkg)
app.use(cors())
app.use(morgan('dev'))
app.use(json())

//* Ruta raiz
app.get('/', (req, res) => {
   res.json({
      name: app.get("pkg").name,
		author: app.get("pkg").author,
		description: app.get("pkg").description,
		verson: app.get("pkg").version,
	});
})

//* Routes
app.use("/api/auth", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/regular", regularRoutes);
app.use("/api/company", companyRoutes);
createAdmin()

export default app