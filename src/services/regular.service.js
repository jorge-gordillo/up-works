import { apis } from '../helpers/apis'

export const putProfile = async (token, data) => {
	var myHeaders = new Headers()
	myHeaders.append('x-access-token', token)
	myHeaders.append('Content-Type', 'application/json')

	var raw = JSON.stringify(data)

	var requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: raw,
		redirect: 'follow',
	}

	const res = await fetch(apis.regular.profile, requestOptions)
	const profile = await res.json()
	if (profile.error) throw Error(token.error.message)
	return profile
}

export const putContact = async (token, data) => {
	var myHeaders = new Headers()
	myHeaders.append('x-access-token', token)
	myHeaders.append('Content-Type', 'application/json')

	var raw = JSON.stringify(data)

	var requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: raw,
		redirect: 'follow',
	}

	const res = await fetch(apis.regular.contact, requestOptions)
	const contact = await res.json()
	if (contact.error) throw Error(token.error.message)
	return contact
}
export const putTitle = async (token, data) => {
	var myHeaders = new Headers()
	myHeaders.append('x-access-token', token)
	myHeaders.append('Content-Type', 'application/json')

	var raw = JSON.stringify(data)

	var requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: raw,
		redirect: 'follow',
	}

	const res = await fetch(apis.regular.title, requestOptions)
	const title = await res.json()
	if (title.error) throw Error(token.error.message)
	return title
}
