import { createContext, useState } from "react"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const getUser = (role, token) => {
	}

	const login = (token) => {
		setUser({ ...token })
		// getUser(token.role, token.token)
	}

	const logout = () => {
		setUser(null)
	}

	const isLogged = () => !!user
	const hasRole = (role) => user?.role === role

	const contextValue = {
		user,
		setUser,
		login,
		logout,
		isLogged,
		hasRole,
	}

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider