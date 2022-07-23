import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = '/register'

const Register = () => {
	const userRef = useRef()
	const errRef = useRef()

	const [user, setUser] = useState(false)
	const [validName, setValidName] = useState(false)
	const [userFocus, setUserFocus] = useState(false)

	const [pwd, setPwd] = useState(false)
	const [validPwd, setValidPwd] = useState(false)
	const [pwdFocus, setPwdFocus] = useState(false)

	const [matchPwd, setMatchPwd] = useState('')
	const [validMatch, setValidMatch] = useState(false)
	const [matchFocus, setMatchFocus] = useState(false)

	const [errMsg, setErrMsg] = useState('')
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		userRef.current.focus()
	}, [])

	useEffect(() => {
		const result = USER_REGEX.test(user)
		setValidName(result)
	}, [user])

	useEffect(() => {
		const result = PWD_REGEX.test(pwd)
		setValidPwd(result)
		const match = pwd === matchPwd
		setValidMatch(match)
	}, [pwd, matchPwd])

	useEffect(() => {
		setErrMsg('')
	}, [user, pwd, matchPwd])

	const handleSumit = async (e) => {
		e.preventDefault()

		const v1 = USER_REGEX.test(user)
		const v2 = PWD_REGEX.test(pwd)
		if (!v1 || !v2) {
			setErrMsg('Invalid Entry')
			return
		}

		try {
			//    const response = await axios.post(REGISTER_URL,
			//       JSON.stringify({ user, pwd }),
			//       {
			//           headers: { 'Content-Type': 'application/json' },
			//           withCredentials: true
			//       }
			//   )
			const res = {
				data: {
					name: 'jorge',
					email: '203102@gmail.com',
				},
				accessToken: 'dvsdd6w46w4ewf5ewe',
			}
			console.log(res?.data)
			console.log(res?.accessToken)
			console.log(JSON.stringify(res))
			setSuccess(true)
			setUser('')
			setPwd('')
			setMatchPwd('')
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response')
			} else if (err.response?.status === 409) {
				setErrMsg('Username Taken')
			} else {
				setErrMsg('Registration Failed')
			}
			errRef.current.focus()
		}
	}

	return (
		<>
			{success ? (
				<section>
					<h1>Succes!</h1>
					<p>
						<Link to="/login">Sign In</Link>
					</p>
				</section>
			) : (
				<section>
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						arial-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Register</h1>
					<form onClick={handleSumit}>
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={({ target }) => setUser(target.value)}
							aria-invalid={validName ? 'false' : 'true'}
							aria-describedby="uidnote"
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
							required
						/>
						<p
							id="uidnote"
							className={
								userFocus && user && !validName
									? 'instructions'
									: 'offscreen'
							}
						>
							4 to 24 characters.
							<br />
							Must begin with a letter.
							<br />
							Letters, numbers, underscores, hyphens allowed.
						</p>
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							autoComplete="off"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							aria-invalid={validPwd ? 'false' : 'true'}
							aria-describedby="pwdnote"
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
							required
						/>
						<p
							id="pwdnote"
							className={
								pwdFocus && !validPwd
									? 'instructions'
									: 'offscreen'
							}
						>
							8 to 24 characters.
							<br />
							Must include uppercase and lowercase letters, a
							number and a special character.
							<br />
							Allowed special characters:{' '}
							<span aria-label="exclamation mark">!</span>{' '}
							<span aria-label="at symbol">@</span>{' '}
							<span aria-label="hashtag">#</span>{' '}
							<span aria-label="dollar sign">$</span>{' '}
							<span aria-label="percent">%</span>
						</p>
						<label htmlFor="confirm_pwd">Confirm Password:</label>
						<input
							type="password"
							id="confirm_pwd"
							autoComplete="off"
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							aria-invalid={validMatch ? 'false' : 'true'}
							aria-describedby="confirmnote"
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
							required
						/>
						<p
							id="confirmnote"
							className={
								matchFocus && !validMatch
									? 'instructions'
									: 'offscreen'
							}
						>
							Must match the first password input field.
						</p>

						<button
							disabled={
								!validName || !validPwd || !validMatch
									? true
									: false
							}
						>
							Sign Up
						</button>
					</form>
					<p>
						Already registered?
						<br />
						<span className="line">
							<Link to="/login">Sign In</Link>
						</span>
					</p>
				</section>
			)}
		</>
	)
}

export default Register
