import { Link } from "react-router-dom"
import {Input} from '@mui/material'
import { useState } from "react"

const Home = () => {
   const [date, setDate] = useState('2022-02-15')
   const [time, setTime] = useState('11:45')
   return (
      <>
      <section>
         <h1>Home</h1>
         <br />
         <h2>Public</h2>
         <Link to="/login">Login</Link>
         <Link to="/acerca-de">About</Link>
         <Link to="/aviso-privacidad">Notice Privacy</Link>
         <Link to="/terminos-condiciones">Terms Conditions</Link>
         <Link to="/FAQ">FAQ</Link>
         <br />
         <h2>Private</h2>
         <Link to="/dashboard">Dashboard</Link>
         <Link to="/vacante">Vacant</Link>
         <Link to="/perfil">Profile</Link>
         <Link to="/postulaciones">Applications</Link>
         <br />
         <h2>Company</h2>
         <Link to='/empresa/vacantes'>Jobs List</Link>
         <Link to='/empresa/vacante/15'>Edit Job</Link>
         <Link to='/empresa/vacante/15/postulaciones'>Application</Link>
         <Link to='/empresa/postulante/15'>Applicant</Link>
         <Link to='/empresa/nueva-vacante'>New Job</Link>
         <br />
         <h2>Admin</h2>
         <Link to='/admin/usuarios'>User List</Link>
         <Link to='/admin/empresas'>Busines List</Link>
         <br />
      </section>
         <Input sx={{ color: "#fff"}} value={date} type='date' onChange={({ target }) => {
            setDate(target.value)
         }} />
         <Input sx={{ color: "#fff"}} value={time} type='time' onChange={({ target }) => {
            setTime(target.value)
         }} />
      </>
   )
}

export default Home
