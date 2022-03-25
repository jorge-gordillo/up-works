import { useRef, useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { loginWhitEmail } from "../services/auth.service"
import { CircularProgress } from "@mui/material"
import { Card, Form, Button, Row, Col } from "react-bootstrap"
import { Alert } from "../components/common"
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
         console.log({...token.data});
         setEmail('')
         setPassword('')
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
				<Card border="success" className="text-center" style={{paddingBottom: '2.6rem'}} >
				<Card.Title>Iniciar Sesión</Card.Title>
					<Card.Body >
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<Form.Label>Correo</Form.Label>
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
								<Form.Label>Contraseña</Form.Label>
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
									variant="primary"
									type="submit"
									className="mx-auto"
								>
									Iniciar sesión
								</Button>
							)}
						</Form>
					</Card.Body>
				</Card>
				{errMsg && (
					<Alert type="error" title="Error">
						{errMsg}
					</Alert>
				)}
			</Col>
      </Row>
	  
      </>
   )
}

export default Login