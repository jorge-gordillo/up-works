import { useRef, useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { loginWhitEmail } from "../services/auth.service"
import { CircularProgress,Typography } from "@mui/material"
import { Card, Form, Button, Row, Col } from "react-bootstrap"
import { Alert } from "../components/common"
import useAuth from '../hooks/useAuth'

const Login = () => {
   const { login } = useAuth()

   const navigate = useNavigate()
   const location = useLocation()
   const from = location.state?.from?.pathname || '/inicio'

   const emailRef = useRef()
   const errRef = useRef()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [errMsg, setErrMsg] = useState('')
	const [loading, setLoading] = useState(false)

   useEffect(() => {
      emailRef.current.focus()
   }, [])
   
   useEffect(() => {
      setErrMsg('')
   }, [email, password])
   
   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         setLoading(true)
         const token = await loginWhitEmail(email, password)
         if (token.error) throw Error(token.error.msg)
         login({ ...token.data })
		 localStorage.setItem('token', token.data.token);
		 localStorage.setItem('id',(token.data.id));
		 localStorage.setItem('photo',(token.data.photo));
		 localStorage.setItem('name',(token.data.name));

         console.log({...token.data});
         setEmail('')
         setPassword('')
		 setLoading(false)
         navigate(from, { replace: true })
		 
      } catch (e) {
         console.log(e);
         setErrMsg(e.message)
         setLoading(false)
      }
	  
   }
   

   return (
      <>
         <Row>
			<Col md={6} className="mx-auto mt-5">
				<Card border="success" className="text-center">
				<Card.Title><Typography variant="h4">Iniciar Sesión</Typography></Card.Title>
					<Card.Body >
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<Form.Label><Typography variant="h5">Correo</Typography></Form.Label>
								<Form.Control
                           id="email"
									name="email"
									type="email"
                           value={email}
                           ref={emailRef}
									autoComplete="on"
									placeholder="Correo electronico"
									onChange={({ target }) => setEmail(target.value)}
                           required
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label><Typography variant="h5">Contraseña</Typography></Form.Label>
								<Form.Control
                           id="password"
									name="password"
									type="password"
									value={password}
									autoComplete="on"
									placeholder="Introduce tu contraseña"
									onChange={({ target }) => setPassword(target.value)}
                           required
								/>
							</Form.Group>
							{loading ? (
								<CircularProgress />
							): (
								<Button
								    variant="outline-success"
									type="submit"
									className="mx-auto"
								>
									Iniciar sesión
								</Button>
							)}
						</Form>
						{errMsg && (
					<Alert type="error" title="Error">
						{errMsg}
					</Alert>
				)}
					</Card.Body>
				</Card>
			</Col>
      </Row>
      </>
	  
   )
}

export default Login