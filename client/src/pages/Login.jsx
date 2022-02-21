import { useRef, useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { loginWhitEmail } from "../services/auth.service"
import useAuth from '../hooks/useAuth'

const Login = () => {
   const { login } = useAuth()

   const navigate = useNavigate()
   const location = useLocation()
   const from = location.state?.from?.pathname || '/dashboard'

   const emailRef = useRef()
   const errRef = useRef()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [errMsg, setErrMsg] = useState('')

   useEffect(() => {
      emailRef.current.focus()
   }, [])
   
   useEffect(() => {
      setErrMsg('')
   }, [email, password])
   
   const handleSubmit = async (e) => {
      e.preventDefault()
      loginWhitEmail(email, password)
         .then((token) => {
            login({...token})
            setEmail('')
            setPassword('')
            navigate(from, { replace: true })
         })
         .catch((e) => {
            setErrMsg(e.message)
            errRef.current.focus()
         })
   }

   return (
      <section>
         <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
         <h1>Sign In</h1>
         <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
               type="text"
               id="email"
               ref={emailRef}
               autoComplete="on"
               onChange={({target}) => setEmail(target.value)}
               value={email}
               required
            />

            <label htmlFor="password">Password:</label>
            <input
               type="password"
               id="password"
               autoComplete='on'
               onChange={({target}) => setPassword(target.value)}
               value={password}
               required
            />

            <button>Sign In</button>
         </form>
         <p>
            Need an Account?<br />
            <span className="line">
               <Link to="/register">Sign Up</Link>
            </span>
         </p>
      </section>

   )
}

export default Login