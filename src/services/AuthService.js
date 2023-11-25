import axios from "./customize-axios";

//call api
const fetchRegister = (name, username, password, role) => {
    return axios.post('api/user', { name, username, password, role });
}

const fetchLogin = (username, password) => {
    return axios.post('api/token', { username, password });
}

const fetchGetUserByJWT = () => {
    return axios.get(`api/token/info`)
}

export {
    fetchGetUserByJWT,
    fetchLogin,
    fetchRegister
};