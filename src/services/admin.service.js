import { api } from "../helpers"

export const getUsers = async (token) => {
	var myHeaders = new Headers()
	myHeaders.append("x-access-token", token)

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	}

	const res = await fetch(api.admin.regular, requestOptions)
   const data = await res.json()
	if (data.error) throw Error(token?.error?.message)
	return data
}

export const refreshToken = async (token) => {
   
}