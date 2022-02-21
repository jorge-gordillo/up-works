import { useNavigate, Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Dashboard = () => {
   const navigate = useNavigate()
   const { logout } = useAuth()
   
   const singOut = () => {
      logout()
      navigate('/')
   }

   return (
      <section>
         <h1>Dashboard</h1>
         <br />
         <p>You are logged in!</p>
         <br />
         <Link to="/editor">Go to the Editor page</Link>
         <br />
         <Link to="/admin">Go to the Admin page</Link>
         <br />
         <Link to="/lounge">Go to the Lounge</Link>
         <br />
         <Link to="/">Go to Home</Link>
         <div className="flexGrow">
            <button onClick={singOut}>Sign Out</button>
         </div>
      </section>
   )
}

export default Dashboard