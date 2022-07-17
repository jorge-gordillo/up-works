//* Contantes de las Api's
const baseURL = 'http://localhost:8000/api/v1/'
export const apis = {
	singIn: `${baseURL}login/`,
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
