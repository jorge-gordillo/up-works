//* Contantes de las Api's
const baseURL = 'http://localhost:4000/api'
export const apis = {
	singIn: `${baseURL}/auth/login`,
	passwordReset: ``,
	getData: (role) => `${baseURL}/${role}`,
	regular: {
		profile: `${baseURL}/regular/profile`,
		contact: `${baseURL}/regular/contact`,
		title: `${baseURL}/regular/title`,
		setData: ``,
	},
	admin: {
		regular: `${baseURL}/admin/regular`,
		conpany: `${baseURL}/admin/company`,
	},
	company: {
		getUser: ``,
		setData: ``,
	},
};
