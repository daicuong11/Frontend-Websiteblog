import axios from "./customize-axios";

//call api
const fetchLogin = (username, password) => {
    return axios.post('/api/token', {username, password});
}

const fetchGetUserByJWT = () => {
    return axios.get(`api/token/info`)
}

export { fetchGetUserByJWT , fetchLogin};