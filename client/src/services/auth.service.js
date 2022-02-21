import { api } from "../helpers";

export const loginWhitEmail = async (email, password) => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    var raw = JSON.stringify({
        email,
        password
    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    const res = await fetch(api.singIn, requestOptions)
    const token = await res.json()
    if (token.error) throw Error(token.error.message)
    return token
}

export const getData = async(role, token) => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const res = await fetch(api.getData(role), requestOptions)
    const user = await res.json()
    if (user.error) throw Error(user.error.message)
    return user
}